// GET /api/gallery — returns gallery photos as JSON.
export const gallery = [
  { id: 1, image: '/images/gallery/gallery-1.webp', alt: 'Latte with heart latte art', span: 'normal' },
  { id: 2, image: '/images/gallery/gallery-2.webp', alt: 'Cozy café interior seating', span: 'wide' },
  { id: 3, image: '/images/gallery/gallery-3.webp', alt: 'Roasted coffee beans with note card', span: 'normal' },
  { id: 4, image: '/images/gallery/gallery-4.webp', alt: 'Slice of layered cake', span: 'normal' },
  { id: 5, image: '/images/gallery/gallery-5.webp', alt: 'Neon sign in a café', span: 'normal' },
  { id: 6, image: '/images/gallery/gallery-6.webp', alt: 'Laptop and coffee on table', span: 'normal' }
]

export function getGallery(_req, res) {
  res.json(gallery)
}
