<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'
import { useAuth } from '@/composables/useAuth'
import { useMenu } from '@/composables/useMenu'
import BrandLogo from '@/components/BrandLogo.vue'

const { itemCount, openCart } = useCart()
const { user, isLoggedIn, logout } = useAuth()
const router = useRouter()

const isMobileOpen = ref(false)
const isSearchOpen = ref(false)
const searchTerm = ref('')
const searchWrapRef = ref<HTMLElement | null>(null)

const { data: menuItems, fetchMenu } = useMenu()
onMounted(fetchMenu)

const searchResults = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  if (!term) return []
  return menuItems.value.filter((item) => item.name.toLowerCase().includes(term)).slice(0, 6)
})

function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value
  if (!isSearchOpen.value) searchTerm.value = ''
}

function goToItem(name: string) {
  router.push({ path: '/menu', query: { search: name } })
  isSearchOpen.value = false
  searchTerm.value = ''
}

function submitSearch() {
  if (!searchTerm.value.trim()) return
  router.push({ path: '/menu', query: { search: searchTerm.value.trim() } })
  isSearchOpen.value = false
  searchTerm.value = ''
}

function handleClickOutside(e: MouseEvent) {
  if (searchWrapRef.value && !searchWrapRef.value.contains(e.target as Node)) {
    isSearchOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

const links = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' }
]
</script>

<template>
  <header class="navbar">
    <div class="container navbar-inner">
      <BrandLogo size="md" />

      <nav class="nav-links">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
      </nav>

      <div class="nav-actions">
        <div class="search-wrap" ref="searchWrapRef">
          <button class="icon-btn" aria-label="Search" @click="toggleSearch">🔍</button>
          <transition name="fade">
            <div v-if="isSearchOpen" class="search-panel">
              <form @submit.prevent="submitSearch">
                <input
                  v-model="searchTerm"
                  type="text"
                  placeholder="Search cappuccino, mocha…"
                  autofocus
                />
              </form>
              <ul v-if="searchTerm.trim()" class="search-results">
                <li v-if="!searchResults.length" class="no-results">No items match "{{ searchTerm }}"</li>
                <li v-for="item in searchResults" :key="item.id" @click="goToItem(item.name)">
                  <img :src="item.image" :alt="item.name" />
                  <span class="result-name">{{ item.name }}</span>
                  <span class="result-price">₹{{ item.price }}</span>
                </li>
              </ul>
            </div>
          </transition>
        </div>

        <button class="icon-btn cart-btn" aria-label="Cart" @click="openCart">
          🛒
          <span class="cart-count">{{ itemCount }}</span>
        </button>

        <template v-if="isLoggedIn">
          <span class="user-greeting">Hi, {{ user?.name.split(' ')[0] }}</span>
          <button class="btn btn-outline login-btn" @click="logout">Logout</button>
        </template>
        <button v-else class="btn btn-primary login-btn" @click="router.push('/login')">Login / Sign Up</button>

        <button class="hamburger" @click="isMobileOpen = !isMobileOpen" aria-label="Menu">☰</button>
      </div>
    </div>

    <transition name="slide-down">
      <nav v-if="isMobileOpen" class="mobile-nav">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" @click="isMobileOpen = false">{{ link.label }}</RouterLink>
        <template v-if="isLoggedIn">
          <span class="user-greeting">Hi, {{ user?.name.split(' ')[0] }}</span>
          <button class="btn btn-outline" @click="logout">Logout</button>
        </template>
        <button v-else class="btn btn-primary" @click="router.push('/login'); isMobileOpen = false">Login / Sign Up</button>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.navbar { position: sticky; top: 0; z-index: 100; background: rgba(255, 248, 244, 0.92); backdrop-filter: blur(10px); }
.navbar-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; }
.nav-links { display: flex; gap: 30px; }
.nav-links a { font-size: 0.95rem; color: var(--brown-text); }
.nav-links a:hover, .nav-links a.router-link-active { color: var(--mauve); }
.nav-actions { display: flex; align-items: center; gap: 14px; }
.icon-btn { font-size: 1.05rem; position: relative; }
.cart-count {
  position: absolute; top: -8px; right: -10px; background: var(--mauve); color: #fff;
  font-size: 0.65rem; min-width: 16px; height: 16px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; padding: 0 3px;
}
.login-btn { padding: 10px 22px; font-size: 0.85rem; }
.user-greeting { font-size: 0.9rem; color: var(--brown-text); white-space: nowrap; }
.hamburger { display: none; font-size: 1.4rem; }
.mobile-nav { display: none; }

.search-wrap { position: relative; }
.search-panel {
  position: absolute; top: calc(100% + 14px); right: 0; width: 300px;
  background: var(--cream); border-radius: var(--radius-md); box-shadow: var(--shadow-soft);
  padding: 14px; z-index: 150;
}
.search-panel input {
  width: 100%; padding: 10px 14px; border-radius: var(--radius-sm);
  border: 1px solid var(--border-soft); font-family: var(--font-body); font-size: 0.9rem;
}
.search-panel input:focus { outline: none; border-color: var(--mauve); }
.search-results { list-style: none; margin: 10px 0 0; padding: 0; max-height: 280px; overflow-y: auto; }
.search-results li {
  display: flex; align-items: center; gap: 10px; padding: 8px 6px; border-radius: var(--radius-sm);
  cursor: pointer; transition: background 0.15s ease;
}
.search-results li:hover { background: var(--pink-soft); }
.search-results img { width: 36px; height: 36px; border-radius: 8px; object-fit: cover; }
.result-name { flex: 1; font-size: 0.88rem; }
.result-price { font-size: 0.85rem; color: var(--mauve); font-weight: 600; }
.no-results { font-size: 0.85rem; color: var(--brown-text-light); padding: 8px 6px; cursor: default; }
.no-results:hover { background: transparent; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 960px) {
  .nav-links, .login-btn, .nav-actions .user-greeting { display: none; }
  .hamburger { display: block; }
  .mobile-nav { display: flex; flex-direction: column; gap: 16px; padding: 20px 20px 28px; background: var(--cream); border-top: 1px solid var(--border-soft); }
}
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
