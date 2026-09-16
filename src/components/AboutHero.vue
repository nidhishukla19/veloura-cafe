<script setup lang="ts">
import aboutData from '@/data/about.json'
import type { AboutData } from '@/types'

const { hero } = aboutData as AboutData
</script>

<template>
  <section class="about-hero">
    <span class="hero-blob hero-blob-1" aria-hidden="true"></span>
    <span class="hero-blob hero-blob-2" aria-hidden="true"></span>

    <div class="container about-hero-grid">
      <div class="about-hero-copy fade-in">
        <p class="eyebrow">{{ hero.eyebrow }}</p>
        <h1 v-html="hero.title"></h1>
        <p class="about-hero-text">{{ hero.description }}</p>
        <div class="about-hero-actions">
          <RouterLink to="/menu" class="btn btn-primary">{{ hero.buttonText }} →</RouterLink>
          <RouterLink to="/contact" class="btn btn-outline">{{ hero.secondaryButtonText }}</RouterLink>
        </div>
      </div>
      <div class="about-hero-visual fade-in img-zoom">
        <img :src="hero.image" alt="Veloura Café ambience" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-hero { position: relative; padding: 56px 0 96px; background: var(--pink-soft); overflow: hidden; }
.about-hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
.about-hero-copy h1 { font-size: 3rem; line-height: 1.15; margin: 10px 0 20px; }
.about-hero-text { max-width: 440px; font-size: 1.05rem; margin-bottom: 30px; }
.about-hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
.about-hero-visual { border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-soft); }
.about-hero-visual img { width: 100%; height: 420px; object-fit: cover; }

/* Subtle lavender decorative elements */
.hero-blob { position: absolute; border-radius: 50%; filter: blur(2px); opacity: 0.5; pointer-events: none; }
.hero-blob-1 { width: 220px; height: 220px; top: -60px; left: -60px; background: radial-gradient(circle, var(--lavender) 0%, transparent 72%); }
.hero-blob-2 { width: 300px; height: 300px; bottom: -120px; right: -80px; background: radial-gradient(circle, var(--mauve) 0%, transparent 72%); opacity: 0.25; }

@media (max-width: 960px) {
  .about-hero-grid { grid-template-columns: 1fr; }
  .about-hero-copy h1 { font-size: 2.2rem; }
  .about-hero-visual img { height: 300px; }
}
</style>
