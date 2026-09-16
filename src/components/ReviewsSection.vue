<script setup lang="ts">
import { onMounted } from 'vue'
import { useReviews } from '@/composables/useReviews'
import ReviewCard from './ReviewCard.vue'

const { data: reviews, pending, error, fetchReviews } = useReviews()
onMounted(fetchReviews)
</script>

<template>
  <section class="reviews-section section">
    <div class="container">
      <div class="reviews-header">
        <div class="section-heading">
          <h2>What Our Guests Say ♡</h2>
          <p>Real people. Real coffee. Real love.</p>
        </div>
        <RouterLink to="/reviews" class="view-full">View All Reviews →</RouterLink>
      </div>

      <div v-if="pending">Loading reviews…</div>
      <div v-else-if="error">Something went wrong.</div>
      <div v-else-if="!reviews.length">No reviews yet — be the first!</div>
      <div v-else class="reviews-grid">
        <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 32px; }
.view-full { color: var(--mauve); font-weight: 500; font-size: 0.9rem; }
.reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

@media (max-width: 960px) {
  .reviews-grid { grid-template-columns: 1fr; }
}
</style>
