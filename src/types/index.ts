// Shared TypeScript types for the Veloura Café frontend.
// These mirror the JSON shapes actually returned by the Express API in
// `server/` and the local content in `src/data/about.json`.

// ---------------------------------------------------------------------------
// Menu (GET /api/menu — server/api/menu.js)
// ---------------------------------------------------------------------------
export interface MenuItem {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
}

// ---------------------------------------------------------------------------
// Reviews (GET /api/reviews — server/api/reviews.js)
// ---------------------------------------------------------------------------
export interface Review {
  id: number
  name: string
  rating: number
  text: string
  image: string
}

// ---------------------------------------------------------------------------
// Gallery (GET /api/gallery — server/api/gallery.js)
// ---------------------------------------------------------------------------
export interface GalleryItem {
  id: number
  image: string
  alt: string
  span: 'normal' | 'wide'
}

// ---------------------------------------------------------------------------
// Cart / Orders (POST /api/orders — server/api/orders.js)
// ---------------------------------------------------------------------------
export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

// Request body sent to POST /api/orders — matches the fields read via
// `req.body` in server/api/orders.js (customerName, phone, items, total).
export interface Order {
  customerName: string
  phone: string
  items: CartItem[]
  total: number
}

export interface OrderResponse {
  success: boolean
  message: string
}

// ---------------------------------------------------------------------------
// Contact (POST /api/contact — server/api/contact.js)
// ---------------------------------------------------------------------------
export interface ContactMessage {
  name: string
  email: string
  phone: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

// ---------------------------------------------------------------------------
// Auth (POST /api/auth/signup, POST /api/auth/login — server/api/auth.js)
// ---------------------------------------------------------------------------
// Shape of the `user` object the backend returns on successful signup/login
// (server/api/auth.js only ever sends back `{ name, email }`, never the
// password/hash).
export interface User {
  name: string
  email: string
}

export interface SignupPayload {
  name: string
  email: string
  phone?: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

// Both /api/auth/signup and /api/auth/login always respond with
// { success, message } and include `user` only when success is true.
export interface AuthResponse {
  success: boolean
  message: string
  user?: User
}

// ---------------------------------------------------------------------------
// About page content (src/data/about.json — statically imported, not fetched)
// ---------------------------------------------------------------------------
export interface AboutHeroData {
  eyebrow: string
  title: string
  description: string
  image: string
  buttonText: string
  secondaryButtonText: string
}

export interface AboutStoryData {
  eyebrow: string
  title: string
  paragraphs: string[]
  image: string
  note: string
}

export interface AboutPhilosophyItem {
  icon: string
  title: string
  description: string
}

export interface AboutPhilosophyData {
  eyebrow: string
  title: string
  description: string
  items: AboutPhilosophyItem[]
}

export interface AboutWhyVelouraItem {
  icon: string
  title: string
  description: string
}

export interface AboutWhyVelouraData {
  eyebrow: string
  title: string
  description: string
  items: AboutWhyVelouraItem[]
}

export interface AboutValueItem {
  number: string
  title: string
  description: string
}

export interface AboutValuesData {
  eyebrow: string
  title: string
  items: AboutValueItem[]
}

export interface AboutStat {
  value: string
  label: string
}

export interface AboutExperienceData {
  eyebrow: string
  title: string
  description: string
  image: string
  features: string[]
}

export interface AboutCtaData {
  eyebrow: string
  title: string
  description: string
  primaryButton: string
  secondaryButton: string
}

export interface AboutData {
  hero: AboutHeroData
  story: AboutStoryData
  philosophy: AboutPhilosophyData
  whyVeloura: AboutWhyVelouraData
  values: AboutValuesData
  stats: AboutStat[]
  experience: AboutExperienceData
  cta: AboutCtaData
}
