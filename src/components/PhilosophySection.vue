<script setup lang="ts">
import aboutData from '@/data/about.json'
import type { AboutData } from '@/types'

const { philosophy } = aboutData as AboutData

// Maps the semantic icon keys stored in about.json to a display glyph, so
// content stays decoupled from presentation.
const iconMap: Record<string, string> = {
  coffee: '☕',
  leaf: '🌿',
  heart: '♡'
}
</script>

<template>
  <section class="philosophy-section section">
    <div class="container">
      <div class="section-heading center">
        <p class="eyebrow">{{ philosophy.eyebrow }}</p>
        <h2>{{ philosophy.title }}</h2>
        <p class="philosophy-intro">{{ philosophy.description }}</p>
      </div>

      <div class="philosophy-grid">
        <div v-for="item in philosophy.items" :key="item.title" class="philosophy-card card fade-in">
          <span class="philosophy-icon">{{ iconMap[item.icon] ?? '✦' }}</span>
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.philosophy-section { background: var(--pink-soft); }
.section-heading.center { text-align: center; margin-bottom: 48px; }
.philosophy-intro { max-width: 520px; margin: 12px auto 0; }
.philosophy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.philosophy-card { padding: 40px 28px; text-align: center; }
.philosophy-icon { font-size: 2.2rem; display: block; margin-bottom: 18px; }
.philosophy-card h4 { font-size: 1.1rem; margin-bottom: 10px; }
.philosophy-card p { font-size: 0.92rem; }

@media (max-width: 960px) {
  .philosophy-grid { grid-template-columns: 1fr; }
}
</style>
