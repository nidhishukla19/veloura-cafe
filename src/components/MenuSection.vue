<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenu } from '@/composables/useMenu'
import MenuCard from './MenuCard.vue'

const { data: menuItems, pending, error, fetchMenu } = useMenu()
onMounted(fetchMenu)

const route = useRoute()
const router = useRouter()

const categories = ['All', 'Hot Coffee', 'Cold Coffee', 'Tea', 'Snacks', 'Desserts']
const activeCategory = ref('All')
const searchTerm = ref(typeof route.query.search === 'string' ? route.query.search : '')

// Keep the search box in sync if the user arrives here again via Navbar search.
watch(
  () => route.query.search,
  (val) => {
    searchTerm.value = typeof val === 'string' ? val : ''
  }
)

function clearSearch() {
  searchTerm.value = ''
  router.replace({ path: '/menu' })
}

const filteredItems = computed(() => {
  let items = menuItems.value
  if (activeCategory.value !== 'All') {
    items = items.filter((item) => item.category === activeCategory.value)
  }
  const term = searchTerm.value.trim().toLowerCase()
  if (term) {
    items = items.filter((item) => item.name.toLowerCase().includes(term))
  }
  return items
})
</script>

<template>
  <section class="menu-section section">
    <div class="container">
      <div class="menu-header">
        <div class="section-heading">
          <h2>Our Special Menu ♡</h2>
          <p>Find your favorite brew — handcrafted with love, just for you.</p>
        </div>
        <RouterLink to="/menu" class="view-full">View Full Menu →</RouterLink>
      </div>

      <div class="menu-toolbar">
        <div class="filters">
          <button v-for="cat in categories" :key="cat" class="filter-btn" :class="{ active: activeCategory === cat }" @click="activeCategory = cat">
            {{ cat }}
          </button>
        </div>
        <div class="search-box">
          <input v-model="searchTerm" type="text" placeholder="Search menu…" />
          <button v-if="searchTerm" class="clear-btn" @click="clearSearch" aria-label="Clear search">✕</button>
        </div>
      </div>

      <p v-if="searchTerm.trim()" class="search-note">
        Showing results for "<strong>{{ searchTerm }}</strong>"
      </p>

      <div v-if="pending">Loading menu…</div>
      <div v-else-if="error">Something went wrong.</div>
      <div v-else-if="!filteredItems.length">No menu items available.</div>
      <div v-else class="menu-grid">
        <MenuCard v-for="item in filteredItems" :key="item.id" :item="item" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-section { background: var(--pink-soft); }
.menu-header { display: flex; align-items: flex-end; justify-content: space-between; }
.view-full { color: var(--mauve); font-weight: 500; font-size: 0.9rem; }
.menu-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 12px; }
.filters { display: flex; flex-wrap: wrap; gap: 12px; }
.filter-btn { padding: 9px 22px; border-radius: 999px; border: 1px solid var(--border-soft); background: #fff; font-size: 0.88rem; transition: all 0.2s ease; }
.filter-btn.active { background: var(--mauve); color: #fff; border-color: var(--mauve); }
.filter-btn:hover:not(.active) { border-color: var(--mauve); color: var(--mauve); }
.search-box { position: relative; }
.search-box input {
  padding: 9px 36px 9px 16px; border-radius: 999px; border: 1px solid var(--border-soft);
  background: #fff; font-family: var(--font-body); font-size: 0.88rem; width: 220px;
}
.search-box input:focus { outline: none; border-color: var(--mauve); }
.clear-btn { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 0.8rem; opacity: 0.6; }
.clear-btn:hover { opacity: 1; }
.search-note { font-size: 0.88rem; margin-bottom: 20px; color: var(--brown-text-light); }
.menu-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

@media (max-width: 960px) {
  .menu-header { flex-direction: column; align-items: flex-start; gap: 10px; }
  .menu-toolbar { flex-direction: column; align-items: stretch; }
  .search-box input { width: 100%; }
  .menu-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .menu-grid { grid-template-columns: 1fr; }
}
</style>
