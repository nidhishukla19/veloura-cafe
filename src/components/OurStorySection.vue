<script setup lang="ts">
import aboutData from '@/data/about.json'
import type { AboutData } from '@/types'

const { story } = aboutData as AboutData
</script>

<template>
  <section class="story-section section">
    <div class="container story-grid">
      <div class="story-visual fade-in img-zoom">
        <img :src="story.image" alt="Veloura Café founders roasting coffee" />
        <p class="script-text story-note">{{ story.note }}</p>
      </div>

      <div class="story-copy fade-in">
        <p class="eyebrow">{{ story.eyebrow }}</p>
        <h2>{{ story.title }}</h2>
        <p v-for="(paragraph, index) in story.paragraphs" :key="index" class="story-text">
          {{ paragraph }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.story-grid { display: grid; grid-template-columns: 0.95fr 1.05fr; gap: 56px; align-items: center; }
.story-visual { position: relative; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-soft); }
.story-visual img { width: 100%; height: 440px; object-fit: cover; }
.story-note { position: absolute; bottom: 20px; left: 20px; max-width: calc(100% - 40px); background: rgba(255,255,255,0.94); padding: 10px 18px; border-radius: var(--radius-sm); box-shadow: var(--shadow-card); }
.story-copy h2 { font-size: 2.1rem; margin: 8px 0 20px; }
.story-text { margin-bottom: 16px; max-width: 460px; }

@media (max-width: 960px) {
  .story-grid { grid-template-columns: 1fr; }
  .story-visual img { height: 320px; }
}
</style>
