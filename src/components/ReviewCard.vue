<script setup lang="ts">
import type { Review } from '@/types'

defineProps<{ review: Review }>()
</script>

<template>
  <div class="review-card card fade-in">
    <div class="review-top">

      <img
        :src="review.image"
        :alt="review.name"
        class="avatar"
        loading="lazy"
        decoding="async"
        @error="(e) => {
          const img = e.target as HTMLImageElement
          img.src = '/images/reviews/review-1.webp'
        }"
      />

      <div>
        <h4>{{ review.name }}</h4>

        <div class="stars">
          <span
            v-for="n in review.rating"
            :key="n"
          >
            ★
          </span>
        </div>
      </div>

    </div>

    <p class="review-text">
      "{{ review.text }}"
    </p>
  </div>
</template>

<style scoped>
.review-card {
  padding: 26px;
}

.review-top {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.avatar {
  width: 64px;
  height: 64px;
  min-width: 64px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.review-top h4 {
  font-size: 1rem;
  margin-bottom: 4px;
}

.stars {
  color: var(--gold);
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.review-text {
  font-style: italic;
}
</style>