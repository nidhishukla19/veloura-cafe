// GET /api/menu — returns the café menu as JSON.
// TIP: each `image` is a path under /public, e.g. "/images/menu/coffee-1.webp".
// Drop new photos into /public/images/menu and point them here.
export const menuItems = [
  { id: 1, name: 'Cappuccino', price: 120, category: 'Hot Coffee', image: '/images/menu/coffee-1.webp', description: 'Rich espresso with creamy steamed milk and a heart of foam.' },
  { id: 2, name: 'Americano', price: 110, category: 'Hot Coffee', image: '/images/menu/coffee-2.webp', description: 'Bold espresso diluted with hot water for a smooth, clean finish.' },
  { id: 3, name: 'Latte', price: 140, category: 'Hot Coffee', image: '/images/menu/coffee-3.webp', description: 'Silky steamed milk poured over a shot of espresso.' },
  { id: 4, name: 'Mocha', price: 150, category: 'Hot Coffee', image: '/images/menu/coffee-4.webp', description: 'Espresso, steamed milk and chocolate, topped with whipped cream.' },
  { id: 5, name: 'Caramel Latte', price: 160, category: 'Hot Coffee', image: '/images/menu/coffee-5.webp', description: 'Smooth espresso and milk swirled with buttery caramel.' },
  { id: 6, name: 'Iced Coffee', price: 140, category: 'Cold Coffee', image: '/images/menu/coffee-6.webp', description: 'Refreshing chilled coffee over ice, smooth and bold.' },
  { id: 7, name: 'Hazelnut Latte', price: 165, category: 'Cold Coffee', image: '/images/menu/food-1.webp', description: 'Iced latte with roasted hazelnut syrup.' },
  { id: 8, name: 'Strawberry Latte', price: 170, category: 'Cold Coffee', image: '/images/menu/food-2.webp', description: 'A sweet, fruity twist on our classic iced latte.' },
  { id: 9, name: 'Blueberry Muffin', price: 130, category: 'Snacks', image: '/images/menu/food-3.webp', description: 'Soft muffin loaded with juicy blueberries.' },
  { id: 10, name: 'Chocolate Cake', price: 180, category: 'Desserts', image: '/images/menu/dessert-1.webp', description: 'Decadent layered chocolate cake, baked fresh daily.' },
  { id: 11, name: 'Croissant', price: 110, category: 'Snacks', image: '/images/menu/dessert-2.webp', description: 'Buttery, flaky and baked fresh every morning.' },
  { id: 12, name: 'Classic Tea', price: 90, category: 'Tea', image: '/images/menu/dessert-3.webp', description: 'A comforting, aromatic brew steeped fresh.' }
]

export function getMenu(_req, res) {
  res.json(menuItems)
}
