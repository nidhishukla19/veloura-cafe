<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    theme?: 'default' | 'inverted'
    linkTo?: string
  }>(),
  {
    size: 'md',
    theme: 'default',
    linkTo: '/'
  }
)

// Only one logo asset ships in public/images/logo (logo.png), so both
// themes use it — requesting a white variant that doesn't exist would
// 404 and render a broken image on the auth pages.
//
// To add a white variant later: drop logo-white.png into
// public/images/logo and return it here when props.theme === 'inverted'.
const logoSrc = computed(() => {
  void props.theme
  return '/images/logo/logo.png'
})
</script>

<template>
  <component
    :is="linkTo ? 'RouterLink' : 'div'"
    :to="linkTo || undefined"
    class="brand-logo"
    :class="[`size-${size}`, `theme-${theme}`]"
    aria-label="Veloura Café"
  >
    <img
      :src="logoSrc"
      alt="Veloura Café"
      class="logo-image"
    />
  </component>
</template>

<style scoped>
.brand-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  line-height: 0;
  flex-shrink: 0;
}

.logo-image {
  display: block;
  width: auto;
  height: auto;
  object-fit: contain;
}

/* Small */
.size-sm .logo-image {
  width: 155px;
  max-height: 65px;
}

/* Medium - Navbar */
.size-md .logo-image {
  width: 200px;
  max-height: 80px;
}

/* Large */
.size-lg .logo-image {
  width: 250px;
  max-height: 100px;
}

/* Mobile */
@media (max-width: 768px) {
  .size-sm .logo-image {
    width: 130px;
    max-height: 55px;
  }

  .size-md .logo-image {
    width: 165px;
    max-height: 65px;
  }

  .size-lg .logo-image {
    width: 200px;
    max-height: 80px;
  }
}
</style>