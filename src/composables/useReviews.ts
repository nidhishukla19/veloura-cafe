import { ref } from 'vue'
import type { Review } from '@/types'

export function useReviews() {
  const data = ref<Review[]>([])
  const pending = ref(false)
  const error = ref<Error | null>(null)

  async function fetchReviews() {
    pending.value = true
    error.value = null

    try {
      data.value = [
        {
          id: 1,
          name: 'Aditi Sharma',
          rating: 5,
          text: 'The best coffee and such a cozy ambience! It feels like a second home. Absolutely love this place!',
          image: '/images/reviews/review-1.webp'
        },
        {
          id: 2,
          name: 'Rahul Verma',
          rating: 5,
          text: 'Great coffee, friendly staff, and a beautiful vibe. Perfect for work or a casual date.',
          image: '/images/reviews/review-1.webp'
        },
        {
          id: 3,
          name: 'Neha Kapoor',
          rating: 5,
          text: 'The atmosphere, the coffee, the little details — everything is just perfect. Highly recommended!',
          image: '/images/reviews/review-1.webp'
        }
      ]
    } catch (err) {
      error.value = err as Error
    } finally {
      pending.value = false
    }
  }

  return {
    data,
    pending,
    error,
    fetchReviews
  }
}