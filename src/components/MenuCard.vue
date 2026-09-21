<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem } from '@/types'
import { useCart } from '@/composables/useCart'

defineProps<{ item: MenuItem }>()
const { addToCart } = useCart()
const isFavorite = ref(false)
</script>

<template>
  <div class="menu-card card fade-in">
    <div class="img-zoom card-img">
      <img :src="item.image" :alt="item.name" loading="lazy" />
      <button class="fav-btn" :class="{ active: isFavorite }" @click="isFavorite = !isFavorite" aria-label="Favorite">♡</button>
    </div>
    <div class="card-body">
      <div class="card-info">
        <h4>{{ item.name }}</h4>
        <span class="price">₹{{ item.price }}</span>
      </div>
      <button class="add-btn" @click="addToCart(item)" aria-label="Add to cart">+</button>
    </div>
  </div>
</template>

<style scoped>
.menu-card { overflow: hidden; }
.card-img { position: relative; aspect-ratio: 4/3; }
.card-img img { width: 100%; height: 100%; object-fit: cover; }
.fav-btn {
  position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-radius: 50%;
  background: rgba(255,255,255,0.9); color: var(--mauve); display: flex; align-items: center; justify-content: center;
  transition: transform 0.2s ease;
}
.fav-btn.active { color: #fff; background: var(--mauve); }
.fav-btn:hover { transform: scale(1.1); }
.card-body { padding: 14px 16px 16px; display: flex; align-items: center; justify-content: space-between; }
.card-info h4 { font-size: 1rem; margin-bottom: 4px; }
.price { color: var(--mauve); font-weight: 600; font-size: 0.95rem; }
.add-btn { width: 34px; height: 34px; border-radius: 50%; background: var(--mauve); color: #fff; font-size: 1.2rem; transition: background 0.2s ease, transform 0.2s ease; }
.add-btn:hover { background: var(--mauve-dark); transform: scale(1.08); }
</style>
