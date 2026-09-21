import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'

createApp(App).use(router).mount('#app')

// Service Worker registration — production only. Registering in `npm run dev`
// would let the SW intercept Vite's own dev-server requests (HMR, module
// graph) and cause stale-module bugs, so it's skipped outside a real build.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.error('Service Worker registration failed:', err)
    })
  })
}
