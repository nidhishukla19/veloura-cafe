<script setup lang="ts">
import aboutData from '@/data/about.json'
import type { AboutData } from '@/types'

const { whyVeloura } = aboutData as AboutData

const iconMap: Record<string, string> = {
  sparkle: '✨',
  menu: '📖',
  hands: '🤝',
  gem: '💎'
}
</script>

<template>
  <section class="why-section section">
    <div class="container">
      <div class="section-heading center">
        <p class="eyebrow">{{ whyVeloura.eyebrow }}</p>
        <h2>{{ whyVeloura.title }}</h2>
        <p class="why-intro">{{ whyVeloura.description }}</p>
      </div>

      <div class="why-grid">
        <div v-for="item in whyVeloura.items" :key="item.title" class="why-card card fade-in">
          <span class="why-icon">{{ iconMap[item.icon] ?? '✦' }}</span>
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-heading.center { text-align: center; margin-bottom: 48px; }
.why-intro { max-width: 560px; margin: 12px auto 0; }
.why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.why-card {
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid transparent;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.why-card:hover { border-color: var(--lavender); }
.why-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  border-radius: 50%;
  background: var(--pink-soft);
  margin-bottom: 12px;
  transition: transform 0.3s ease, background 0.3s ease;
}
.why-card:hover .why-icon { transform: scale(1.08) rotate(-4deg); background: var(--lavender); }
.why-card h4 { font-size: 1.1rem; margin-bottom: 4px; }
.why-card p { font-size: 0.92rem; max-width: 380px; }

@media (max-width: 760px) {
  .why-grid { grid-template-columns: 1fr; }
}
</style>
