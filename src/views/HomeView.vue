<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import MenuSection from '@/components/MenuSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import GallerySection from '@/components/GallerySection.vue'
import OfferSection from '@/components/OfferSection.vue'
import ReviewsSection from '@/components/ReviewsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import Footer from '@/components/Footer.vue'
import CartDrawer from '@/components/CartDrawer.vue'
</script>

<template>
  <div>
    <Navbar />
    <HeroSection />
    <MenuSection />
    <AboutSection />
    <GallerySection />
    <OfferSection />
    <ContactSection />
    <ReviewsSection />
    <Footer />
    <CartDrawer />
  </div>
</template>
