// Veloura Café — Service Worker
//
// Strategy summary (all caching is SHORT-LIVED — nothing is cached for a year):
//
//   /images/*        -> Cache First,   TTL 1 day    (cache: veloura-images-v2)
//   /assets/*        -> Cache First,   TTL 1 day    (cache: veloura-static-v2)  (Vite hashes these filenames)
//   /api/* (GET only)-> Network First, TTL 7 min    (cache: veloura-api-v2)
//   navigation (HTML) -> Network First, TTL 1 hour   (cache: veloura-pages-v2)
//
// The Cache Storage API has no built-in expiry, so every cached entry is
// stamped with a `sw-cached-at` response header at write time. On read, that
// timestamp is compared against Date.now() and the entry is treated as stale
// once it's older than its TTL — see `withTimestamp()` / `isFresh()` below.
//
// Only GET requests are ever read from or written to a cache. POST/PUT/PATCH/
// DELETE (login, signup, contact form, orders, etc.) are never intercepted —
// the very first check in the fetch handler returns immediately for them, so
// they always hit the network exactly as if no Service Worker existed.

const VERSION = 'v2'
const STATIC_CACHE = `veloura-static-${VERSION}`
const IMAGES_CACHE = `veloura-images-${VERSION}`
const API_CACHE = `veloura-api-${VERSION}`
const PAGES_CACHE = `veloura-pages-${VERSION}`

const CURRENT_CACHES = [STATIC_CACHE, IMAGES_CACHE, API_CACHE, PAGES_CACHE]

const ONE_MINUTE = 60 * 1000
const TTL = {
  images: 24 * 60 * ONE_MINUTE, // 1 day
  static: 24 * 60 * ONE_MINUTE, // 1 day
  api: 7 * ONE_MINUTE, // 7 minutes (within the requested 5–10 min range)
  pages: 60 * ONE_MINUTE // 1 hour — short offline fallback, not a long-lived cache
}

// ---------------------------------------------------------------------------
// install — no precaching. Assets are cached on first real use ("runtime
// caching"), which avoids hardcoding Vite's hashed /assets/*.js|css filenames
// into this static file (they change on every build).
// ---------------------------------------------------------------------------
self.addEventListener('install', () => {
  self.skipWaiting()
})

// ---------------------------------------------------------------------------
// activate — remove every cache from a previous Service Worker version.
// ---------------------------------------------------------------------------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const existingCaches = await caches.keys()
      await Promise.all(
        existingCaches
          .filter((name) => name.startsWith('veloura-') && !CURRENT_CACHES.includes(name))
          .map((name) => caches.delete(name))
      )
      await self.clients.claim()
    })()
  )
})

// ---------------------------------------------------------------------------
// fetch
// ---------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Never touch non-GET requests (POST /api/orders, /api/auth/login,
  // /api/auth/signup, /api/contact, etc.). Let the browser handle them
  // exactly as normal — no caching, no interception, full stop.
  if (request.method !== 'GET') {
    return
  }

  const url = new URL(request.url)

  // Only handle same-origin requests. Cross-origin requests (Google Fonts,
  // any third-party calls) are left completely alone.
  if (url.origin !== self.location.origin) {
    return
  }

  // GET /api/* — public, read-only endpoints (menu, gallery, reviews, and
  // any future GET endpoint). Network First with a short TTL fallback.
  // Auth/orders/contact are POST-only and were already excluded above.
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, API_CACHE, TTL.api, jsonOfflineFallback))
    return
  }

  // Static images — Cache First, 1-day TTL.
  if (url.pathname.startsWith('/images/')) {
    event.respondWith(cacheFirst(request, IMAGES_CACHE, TTL.images))
    return
  }

  // Hashed JS/CSS build output — Cache First, 1-day TTL.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE, TTL.static))
    return
  }

  // HTML / SPA navigations — Network First, 1-hour TTL fallback.
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, PAGES_CACHE, TTL.pages, htmlOfflineFallback))
    return
  }

  // Everything else (favicon, misc same-origin GETs): pass through untouched.
})

// ---------------------------------------------------------------------------
// TTL helpers — Cache Storage has no native expiry, so we stamp a timestamp
// header on write and check it on read.
// ---------------------------------------------------------------------------

async function withTimestamp(response) {
  const body = await response.arrayBuffer()
  const headers = new Headers(response.headers)
  headers.set('sw-cached-at', Date.now().toString())
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers
  })
}

function isFresh(cachedResponse, maxAgeMs) {
  const cachedAt = cachedResponse.headers.get('sw-cached-at')
  if (!cachedAt) return false // no timestamp (e.g. leftover from an older SW) — treat as stale
  return Date.now() - Number(cachedAt) < maxAgeMs
}

// ---------------------------------------------------------------------------
// Strategies
// ---------------------------------------------------------------------------

// Cache First, with TTL. Used for images and hashed static assets.
async function cacheFirst(request, cacheName, maxAgeMs) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)

  if (cached && isFresh(cached, maxAgeMs)) {
    return cached
  }

  try {
    const response = await fetch(request)
    if (response && response.ok) {
      cache.put(request, await withTimestamp(response.clone()))
    }
    return response
  } catch (err) {
    // Offline: an expired-but-present entry is still better than nothing.
    if (cached) {
      return cached
    }
    return new Response('', { status: 503, statusText: 'Offline' })
  }
}

// Network First, with TTL. Used for GET /api/* and HTML navigations.
async function networkFirst(request, cacheName, maxAgeMs, offlineFallback) {
  const cache = await caches.open(cacheName)

  try {
    const response = await fetch(request)
    if (response && response.ok) {
      cache.put(request, await withTimestamp(response.clone()))
    }
    return response
  } catch (err) {
    const cached = await cache.match(request)

    // Server unreachable — serve the cached copy if we have one, even if it
    // has technically aged past its TTL. Stale-but-real data beats a hard
    // failure when the network itself is the problem, not the cache.
    if (cached) {
      return cached
    }

    return offlineFallback ? offlineFallback() : new Response('', { status: 503 })
  }
}

function jsonOfflineFallback() {
  return new Response(JSON.stringify({ error: 'You are offline. Please try again.' }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  })
}

function htmlOfflineFallback() {
  return new Response(
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Veloura Café</title></head>' +
      '<body style="font-family: sans-serif; text-align: center; padding: 60px 20px;">' +
      '<h1>You\u2019re offline</h1><p>Please check your connection and try again.</p>' +
      '</body></html>',
    { status: 200, headers: { 'Content-Type': 'text/html' } }
  )
}
