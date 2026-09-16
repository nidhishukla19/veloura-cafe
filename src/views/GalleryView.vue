<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import GallerySection from '@/components/GallerySection.vue'
import Footer from '@/components/Footer.vue'
import CartDrawer from '@/components/CartDrawer.vue'
</script>

<template>
  <div>
    <Navbar />
    <div class="page-spacer"><GallerySection /></div>
    <Footer />
    <CartDrawer />
  </div>
</template>

<style scoped>
.page-spacer { padding-top: 24px; }
</style>
