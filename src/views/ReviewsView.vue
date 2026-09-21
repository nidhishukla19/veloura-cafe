<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import ReviewsSection from '@/components/ReviewsSection.vue'
import Footer from '@/components/Footer.vue'
import CartDrawer from '@/components/CartDrawer.vue'
</script>

<template>
  <div>
    <Navbar />
    <div class="page-spacer"><ReviewsSection /></div>
    <Footer />
    <CartDrawer />
  </div>
</template>

<style scoped>
.page-spacer { padding-top: 24px; }
</style>
