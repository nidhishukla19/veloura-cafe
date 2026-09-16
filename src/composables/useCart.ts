import { reactive, computed } from 'vue'
import type {
  CartItem,
  MenuItem,
  Order,
  OrderResponse
} from '@/types'
import { createOrder } from '@/services/api'

const state = reactive({
  items: [] as CartItem[],
  isOpen: false
})

const cartItems = computed(() => state.items)

const itemCount = computed(() =>
  state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
)

const subtotal = computed(() =>
  state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
)

const total = computed(() => subtotal.value)

function addToCart(item: MenuItem) {
  const existing = state.items.find(
    (i) => i.id === item.id
  )

  if (existing) {
    existing.quantity += 1
  } else {
    state.items.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    })
  }

  // IMPORTANT:
  // Do NOT open the cart drawer here.
  // The item is only added to the cart.
}

function removeFromCart(id: number) {
  const index = state.items.findIndex(
    (item) => item.id === id
  )

  if (index !== -1) {
    state.items.splice(index, 1)
  }
}

function increaseQuantity(id: number) {
  const item = state.items.find(
    (item) => item.id === id
  )

  if (item) {
    item.quantity += 1
  }
}

function decreaseQuantity(id: number) {
  const item = state.items.find(
    (item) => item.id === id
  )

  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1
    } else {
      removeFromCart(id)
    }
  }
}

function clearCart() {
  state.items.splice(0, state.items.length)
}

function openCart() {
  state.isOpen = true
}

function closeCart() {
  state.isOpen = false
}

function getCartTotal() {
  return total.value
}

async function checkout(
  customerName: string,
  phone: string
): Promise<OrderResponse> {
  const order: Order = {
    customerName,
    phone,
    items: state.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity
    })),
    total: total.value
  }

  const response = await createOrder(order)

  if (response.success) {
    clearCart()
    closeCart()
  }

  return response
}

export function useCart() {
  return {
    cartItems,
    isCartOpen: computed(() => state.isOpen),
    itemCount,
    subtotal,
    total,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    openCart,
    closeCart,
    getCartTotal,
    checkout
  }
}