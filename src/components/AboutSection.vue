```vue
<script setup lang="ts">
</script>

<template>
  <section class="experience-section section">
    <div class="container experience-grid">

      <!-- Experience Content -->
      <div class="experience-copy fade-in">
        <p class="eyebrow">The Veloura Experience ♡</p>

        <h2>Come for the Coffee. Stay for the Feeling.</h2>

        <p class="experience-text">
          A quiet morning coffee, an afternoon with friends or an evening
          dessert — Veloura Café is made for every kind of moment.
        </p>

        <div class="experience-features">
          <div class="experience-feature">
            <span>✓</span>
            <p>Comfortable seating</p>
          </div>

          <div class="experience-feature">
            <span>✓</span>
            <p>Freshly prepared food</p>
          </div>

          <div class="experience-feature">
            <span>✓</span>
            <p>Premium coffee</p>
          </div>

          <div class="experience-feature">
            <span>✓</span>
            <p>Friendly service</p>
          </div>

          <div class="experience-feature">
            <span>✓</span>
            <p>Relaxed atmosphere</p>
          </div>

          <div class="experience-feature">
            <span>✓</span>
            <p>Perfect for conversations and work</p>
          </div>
        </div>
      </div>

      <!-- Experience Image -->
      <div class="experience-visual fade-in">
        <div class="img-zoom experience-img">
          <img
            src="/images/about/about-experience.webp"
            alt="The Veloura Café experience"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.experience-section {
  background: var(--pink-soft);
}

.experience-grid {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 56px;
  align-items: center;
}

.experience-copy {
  max-width: 540px;
}

.experience-copy h2 {
  font-size: 2.2rem;
  line-height: 1.2;
  margin: 8px 0 20px;
}

.experience-text {
  margin-bottom: 28px;
  line-height: 1.8;
  max-width: 500px;
}

.experience-features {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 24px;
}

.experience-feature {
  display: flex;
  align-items: center;
  gap: 10px;
}

.experience-feature span {
  flex-shrink: 0;
  font-size: 1rem;
  font-weight: 700;
}

.experience-feature p {
  margin: 0;
  line-height: 1.5;
}

.experience-visual {
  width: 100%;
}

.experience-img {
  width: 100%;
  height: 500px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
}

.experience-img img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 960px) {
  .experience-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .experience-copy {
    max-width: 100%;
  }

  .experience-img {
    height: 420px;
  }
}

@media (max-width: 600px) {
  .experience-img {
    height: 300px;
  }

  .experience-copy h2 {
    font-size: 1.8rem;
  }

  .experience-features {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>

