<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '@/composables/useCart'

const { cartItems, isCartOpen, subtotal, total, closeCart, increaseQuantity, decreaseQuantity, removeFromCart, checkout } = useCart()

const customerName = ref('')
const phone = ref('')
const checkoutState = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const checkoutMessage = ref('')

async function handleCheckout() {
  if (!customerName.value || !phone.value || cartItems.length === 0) return
  checkoutState.value = 'loading'
  try {
    const res = await checkout(customerName.value, phone.value)
    checkoutState.value = 'success'
    checkoutMessage.value = res.message
    customerName.value = ''
    phone.value = ''
  } catch (e) {
    checkoutState.value = 'error'
    checkoutMessage.value = 'Could not place order. Please try again.'
  }
}
</script>

<template>
  <transition name="fade">
    <div v-if="isCartOpen" class="overlay" @click="closeCart"></div>
  </transition>

  <transition name="slide">
    <aside v-if="isCartOpen" class="cart-drawer">
      <div class="cart-header">
        <h3>Your Veloura Cart</h3>
        <button class="close-btn" @click="closeCart" aria-label="Close cart">✕</button>
      </div>

      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Your cup is empty for now — let's find your favorite brew. ☕</p>
      </div>

      <div v-else class="cart-body">
        <ul class="cart-list">
          <li v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" />
            <div class="cart-item-info">
              <h4>{{ item.name }}</h4>
              <span class="price">₹{{ item.price }}</span>
              <div class="qty-controls">
                <button @click="decreaseQuantity(item.id)">−</button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity(item.id)">+</button>
              </div>
            </div>
            <button class="remove-btn" @click="removeFromCart(item.id)" aria-label="Remove">🗑</button>
          </li>
        </ul>

        <div class="cart-summary">
          <div class="summary-row"><span>Subtotal</span><span>₹{{ subtotal }}</span></div>
          <div class="summary-row total"><span>Total</span><span>₹{{ total }}</span></div>
          <p class="cart-microcopy">Made with care, just for you.</p>
        </div>

        <form class="checkout-form" @submit.prevent="handleCheckout">
          <input v-model="customerName" type="text" placeholder="Your Name" required />
          <input v-model="phone" type="tel" placeholder="Phone Number" required />
          <button class="btn btn-primary checkout-btn" type="submit" :disabled="checkoutState === 'loading'">
            {{ checkoutState === 'loading' ? 'Placing Order…' : 'Checkout' }}
          </button>
          <p v-if="checkoutState === 'success'" class="feedback success">{{ checkoutMessage }}</p>
          <p v-if="checkoutState === 'error'" class="feedback error">{{ checkoutMessage }}</p>
        </form>
      </div>
    </aside>
  </transition>
</template>

<style scoped>
.overlay { position: fixed; inset: 0; background: rgba(74, 44, 37, 0.4); z-index: 200; }
.cart-drawer { position: fixed; top: 0; right: 0; width: 400px; max-width: 92vw; height: 100vh; background: var(--cream); z-index: 201; display: flex; flex-direction: column; box-shadow: -10px 0 40px rgba(0,0,0,0.15); }
.cart-header { display: flex; justify-content: space-between; align-items: center; padding: 22px 24px; border-bottom: 1px solid var(--border-soft); }
.close-btn { font-size: 1.1rem; }
.empty-cart { padding: 40px 24px; text-align: center; }
.cart-body { flex: 1; display: flex; flex-direction: column; overflow-y: auto; padding: 20px 24px; }
.cart-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; }
.cart-item { display: flex; gap: 12px; align-items: center; }
.cart-item img { width: 56px; height: 56px; border-radius: var(--radius-sm); object-fit: cover; }
.cart-item-info { flex: 1; }
.cart-item-info h4 { font-size: 0.92rem; margin-bottom: 4px; }
.cart-item-info .price { color: var(--mauve); font-size: 0.85rem; }
.qty-controls { display: flex; align-items: center; gap: 10px; margin-top: 6px; }
.qty-controls button { width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--border-soft); font-size: 0.85rem; }
.remove-btn { font-size: 0.9rem; opacity: 0.6; }
.remove-btn:hover { opacity: 1; }
.cart-summary { margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-soft); }
.summary-row { display: flex; justify-content: space-between; font-size: 0.9rem; padding: 4px 0; }
.summary-row.total { font-weight: 600; font-size: 1.05rem; color: var(--coffee-dark); }
.cart-microcopy { font-family: var(--font-script); color: var(--mauve); font-size: 1rem; margin-top: 10px; text-align: right; }
.checkout-form { display: flex; flex-direction: column; gap: 10px; margin-top: 18px; }
.checkout-form input { padding: 11px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-soft); font-family: var(--font-body); }
.checkout-btn { width: 100%; justify-content: center; }
.feedback { font-size: 0.85rem; }
.feedback.success { color: #3f7d4a; }
.feedback.error { color: #b23b3b; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
