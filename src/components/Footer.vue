<script setup lang="ts">
import BrandLogo from '@/components/BrandLogo.vue'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' }
]
const socials = [
  { icon: '📷', label: 'Instagram' },
  { icon: '📘', label: 'Facebook' },
  { icon: '📌', label: 'Pinterest' },
  { icon: '▶️', label: 'YouTube' }
]
</script>

<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-col footer-brand-col">
        <BrandLogo size="lg" />
        <p class="footer-tagline script-text">Where Every Sip Becomes a Moment ♡</p>
      </div>

      <div class="footer-col">
        <h4>Explore</h4>
        <nav class="footer-links">
          <RouterLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
        </nav>
      </div>

      <div class="footer-col">
        <h4>Visit Us</h4>
        <ul class="footer-info">
          <li>📍 123 Coffee Lane, Jaipur, Rajasthan</li>
          <li>🕐 Mon – Sun · 8:00 AM – 10:00 PM</li>
          <li>📞 +91 98765 43210</li>
          <li>✉️ hello@veloura.cafe</li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Follow Along</h4>
        <div class="footer-socials">
          <a v-for="s in socials" :key="s.label" href="#" :aria-label="s.label">{{ s.icon }}</a>
        </div>
      </div>
    </div>

    <div class="container footer-bottom">
      <p>© {{ new Date().getFullYear() }} Veloura Café. Crafted for coffee lovers.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--pink-soft); color: var(--coffee-dark); padding: 64px 0 0; }
.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 1.1fr 0.8fr;
  gap: 32px;
  padding-bottom: 44px;
  border-bottom: 1px solid rgba(74, 44, 37, 0.12);
}
.footer-col h4 { font-size: 0.95rem; margin-bottom: 16px; }
.footer-brand-col .footer-tagline { margin-top: 14px; font-size: 1.05rem; }
.footer-links { display: flex; flex-direction: column; gap: 10px; }
.footer-links a { color: var(--coffee-dark); opacity: 0.85; font-size: 0.9rem; }
.footer-links a:hover { opacity: 1; color: var(--mauve); }
.footer-info { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 0.88rem; color: var(--brown-text-light); }
.footer-socials { display: flex; gap: 12px; }
.footer-socials a { width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(74,44,37,0.2); display: flex; align-items: center; justify-content: center; font-size: 0.9rem; }
.footer-bottom { padding: 20px 0; text-align: center; }
.footer-bottom p { font-size: 0.82rem; color: var(--brown-text-light); }

@media (max-width: 900px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .footer-grid { grid-template-columns: 1fr; text-align: center; }
  .footer-links, .footer-info { align-items: center; }
  .footer-socials { justify-content: center; }
}
</style>
