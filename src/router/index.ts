import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/menu', name: 'menu', component: () => import('@/views/MenuView.vue') },
    { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
    { path: '/gallery', name: 'gallery', component: () => import('@/views/GalleryView.vue') },
    { path: '/reviews', name: 'reviews', component: () => import('@/views/ReviewsView.vue') },
    { path: '/contact', name: 'contact', component: () => import('@/views/ContactView.vue') },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignUpView.vue'),
      meta: { requiresGuest: true }
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

// Signed-in users don't need to see Login/Sign Up again — send them home
// instead (mirrors "prevent authenticated users from unnecessarily
// accessing login/signup").
router.beforeEach((to) => {
  const { isLoggedIn } = useAuth()
  if (to.meta.requiresGuest && isLoggedIn.value) {
    return { path: '/' }
  }
  return true
})

export default router
