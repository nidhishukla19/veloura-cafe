<script setup lang="ts">
import { onMounted } from 'vue'
import { useGallery } from '@/composables/useGallery'

const { data: galleryItems, pending, error, fetchGallery } = useGallery()
onMounted(fetchGallery)
</script>

<template>
  <section class="gallery-section section">
    <div class="container">
      <div class="section-heading">
        <h2>Our Gallery ♡</h2>
        <p>Moments Brewed Beautifully</p>
      </div>

      <div v-if="pending">Loading gallery…</div>
      <div v-else-if="error">Something went wrong.</div>
      <div v-else-if="!galleryItems.length">No photos available.</div>
      <div v-else class="gallery-grid">
        <div v-for="photo in galleryItems" :key="photo.id" class="img-zoom gallery-item" :class="photo.span">
          <img :src="photo.image" :alt="photo.alt" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 200px; gap: 18px; }
.gallery-item { border-radius: var(--radius-md); overflow: hidden; }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; }
.gallery-item.wide { grid-column: span 2; }

@media (max-width: 960px) {
  .gallery-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 160px; }
}
@media (max-width: 560px) {
  .gallery-grid { grid-template-columns: 1fr; }
  .gallery-item.wide { grid-column: span 1; }
}
</style>
