export const reviews = [{
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

export function getReviews(_req, res) {
    res.json(reviews)
}