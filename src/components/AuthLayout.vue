<script setup lang="ts">
import BrandLogo from '@/components/BrandLogo.vue'

defineProps<{
  heading: string
  tagline: string
  image: string
}>()
</script>

<template>
  <div class="auth-layout">

    <!-- LEFT IMAGE -->
    <div class="auth-visual">
      <img
        :src="image"
        alt="Veloura Café"
      />

      <div class="auth-visual-overlay"></div>

      <div class="auth-visual-copy">

        <BrandLogo
          size="lg"
          theme="inverted"
        />

        <div class="visual-text">
          <h2>{{ heading }}</h2>
          <p>{{ tagline }}</p>
        </div>

      </div>
    </div>

    <!-- RIGHT FORM -->
    <div class="auth-form-side">
      <div class="auth-form-inner">
        <slot />
      </div>
    </div>

  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
}

.auth-visual {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.auth-visual img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
}

.auth-visual-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      180deg,
      rgba(74, 44, 37, 0.08) 0%,
      rgba(74, 44, 37, 0.55) 100%
    ),
    linear-gradient(
      90deg,
      rgba(181, 139, 175, 0.25),
      rgba(255, 248, 244, 0.08)
    );

  pointer-events: none;
}

.auth-visual-copy {
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 48px;

  color: white;
  z-index: 2;
}

.auth-visual-copy :deep(.brand-logo) {
  margin-bottom: auto;
}

.visual-text {
  max-width: 430px;
}

.auth-visual-copy h2 {
  color: white;
  font-size: 2.1rem;
  line-height: 1.2;
  margin: 0 0 12px;
}

.auth-visual-copy p {
  color: #f6e3ea;
  max-width: 380px;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.auth-form-side {
  background: var(--cream, #fff8f4);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px 32px;
}

.auth-form-inner {
  width: 100%;
  max-width: 380px;
}

/* TABLET */
@media (max-width: 900px) {
  .auth-layout {
    grid-template-columns: 1fr;
  }

  .auth-visual {
    min-height: 280px;
    height: 280px;
  }

  .auth-visual-copy {
    padding: 28px;
  }

  .auth-visual-copy h2 {
    font-size: 1.5rem;
  }

  .auth-visual-copy p {
    display: none;
  }

  .auth-form-side {
    min-height: calc(100vh - 280px);
  }
}

/* MOBILE */
@media (max-width: 600px) {
  .auth-visual {
    min-height: 220px;
    height: 220px;
  }

  .auth-visual-copy {
    padding: 20px;
  }

  .auth-form-side {
    padding: 30px 20px;
  }
}
</style>