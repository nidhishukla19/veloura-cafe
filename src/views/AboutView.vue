```vue
<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import AboutHero from '@/components/AboutHero.vue'
import OurStorySection from '@/components/OurStorySection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import PhilosophySection from '@/components/PhilosophySection.vue'
import WhyVelouraSection from '@/components/WhyVelouraSection.vue'
import AboutStatsSection from '@/components/AboutStatsSection.vue'
import ValuesSection from '@/components/ValuesSection.vue'
import AboutCtaSection from '@/components/AboutCtaSection.vue'
import Footer from '@/components/Footer.vue'
import CartDrawer from '@/components/CartDrawer.vue'
</script>

<template>
  <div>
    <Navbar />

    <AboutHero />

    <!-- Our Story -->
    <OurStorySection />

    <!-- The Veloura Experience -->
    <ExperienceSection />

    <!-- Our Philosophy -->
    <PhilosophySection />

    <!-- Why Veloura -->
    <WhyVelouraSection />

    <!-- About Stats -->
    <AboutStatsSection />

    <!-- Our Values -->
    <ValuesSection />

    <!-- Call To Action -->
    <AboutCtaSection />

    <Footer />

    <CartDrawer />
  </div>
</template>
```
