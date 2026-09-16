<script setup lang="ts">
import aboutData from '@/data/about.json'
import type { AboutData } from '@/types'

const { cta } = aboutData as AboutData
</script>

<template>
  <section class="about-cta">
    <span class="cta-glow" aria-hidden="true"></span>
    <div class="container about-cta-inner fade-in">
      <p class="script-text">{{ cta.eyebrow }}</p>
      <h2>{{ cta.title }}</h2>
      <p class="about-cta-text">{{ cta.description }}</p>
      <div class="about-cta-actions">
        <RouterLink to="/menu" class="btn btn-primary">{{ cta.primaryButton }} →</RouterLink>
        <RouterLink to="/contact" class="btn btn-outline btn-outline-light">{{ cta.secondaryButton }}</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-cta { position: relative; overflow: hidden; padding: 100px 0; background: var(--coffee-dark); text-align: center; }
.about-cta-inner { position: relative; z-index: 1; max-width: 580px; margin: 0 auto; }
.about-cta .script-text { color: var(--gold-pink); }
.about-cta h2 { color: #fff; font-size: 2.4rem; margin: 10px 0 16px; }
.about-cta-text { color: #EFD9E2; margin-bottom: 32px; }
.about-cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.about-cta .btn-primary { background: var(--gold); box-shadow: 0 10px 24px rgba(201, 154, 91, 0.35); }
.about-cta .btn-primary:hover { background: #b98a4c; }
.about-cta .btn-outline-light { border-color: rgba(255,255,255,0.5); color: #fff; }
.about-cta .btn-outline-light:hover { background: #fff; color: var(--coffee-dark); border-color: #fff; }

.cta-glow {
  position: absolute; top: 50%; left: 50%; width: 620px; height: 620px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, var(--lavender) 0%, transparent 68%);
  opacity: 0.18; pointer-events: none;
}

@media (max-width: 760px) {
  .about-cta { padding: 72px 0; }
  .about-cta h2 { font-size: 1.9rem; }
}
</style>
