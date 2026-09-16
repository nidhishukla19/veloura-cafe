import { ref } from 'vue'
import type { GalleryItem } from '@/types'

export function useGallery() {
  const data = ref<GalleryItem[]>([])
  const pending = ref(false)
  const error = ref<Error | null>(null)

  async function fetchGallery() {
    pending.value = true
    error.value = null

    try {
      data.value = [
        {
          id: 1,
          image: '/images/gallery/gallery-1.webp',
          alt: 'Veloura Café',
          span: 'wide'
        },
        {
          id: 2,
          image: '/images/gallery/gallery-2.webp',
          alt: 'Veloura Café Interior',
          span: 'normal'
        },
        {
          id: 3,
          image: '/images/gallery/gallery-3.webp',
          alt: 'Coffee at Veloura Café',
          span: 'normal'
        },
        {
          id: 4,
          image: '/images/gallery/gallery-4.webp',
          alt: 'Veloura Café Moments',
          span: 'normal'
        },
        {
          id: 5,
          image: '/images/gallery/gallery-5.webp',
          alt: 'Food at Veloura Café',
          span: 'normal'
        },
        {
          id: 6,
          image: '/images/gallery/gallery-6.webp',
          alt: 'Veloura Café Ambience',
          span: 'wide'
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
    fetchGallery
  }
}