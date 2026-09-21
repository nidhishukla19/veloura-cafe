<script setup lang="ts">
import aboutData from '@/data/about.json'
import type { AboutData } from '@/types'

const { values } = aboutData as AboutData
</script>

<template>
  <section class="values-section section">
    <div class="container">
      <div class="section-heading center">
        <p class="eyebrow">{{ values.eyebrow }}</p>
        <h2>{{ values.title }}</h2>
      </div>

      <div class="values-grid">
        <div v-for="item in values.items" :key="item.number" class="value-block fade-in">
          <span class="value-number">{{ item.number }}</span>
          <div class="value-copy">
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.values-section { background: var(--pink-soft); }
.section-heading.center { text-align: center; margin-bottom: 48px; }
.values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }
.value-block { position: relative; padding: 28px 20px 20px; }
.value-number {
  display: block;
  font-family: var(--font-serif);
  font-size: 3.4rem;
  font-weight: 700;
  line-height: 1;
  color: var(--lavender);
  opacity: 0.55;
  margin-bottom: 6px;
}
.value-copy h4 { font-size: 1.05rem; margin-bottom: 8px; }
.value-copy p { font-size: 0.9rem; }

@media (max-width: 960px) {
  .values-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .values-grid { grid-template-columns: 1fr; }
}
</style>
