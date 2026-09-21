```vue
<script setup lang="ts">
import aboutData from '@/data/about.json'
import type { AboutData } from '@/types'

const { experience } = aboutData as AboutData
</script>

<template>
  <section class="experience-section section">
    <div class="container experience-grid">

      <!-- IMAGE -->
      <div class="experience-visual fade-in img-zoom">
        <img
          src="/images/about/about-experience.webp"
          alt="Guests enjoying the Veloura Café experience"
          loading="lazy"
          decoding="async"
        />
      </div>

      <!-- CONTENT -->
      <div class="experience-copy fade-in">
        <p class="eyebrow">
          {{ experience.eyebrow }}
        </p>

        <h2>
          {{ experience.title }}
        </h2>

        <p class="experience-text">
          {{ experience.description }}
        </p>

        <ul class="experience-features">
          <li
            v-for="feature in experience.features"
            :key="feature"
          >
            <span class="feature-check">✓</span>
            <span>{{ feature }}</span>
          </li>
        </ul>
      </div>

    </div>
  </section>
</template>

<style scoped>
.experience-section {
  width: 100%;
  padding: 90px 0;
}

.experience-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

/* IMAGE */
.experience-visual {
  width: 100%;
  height: 500px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
}

.experience-visual img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* CONTENT */
.experience-copy {
  width: 100%;
  max-width: 560px;
}

.experience-copy h2 {
  font-size: 2.2rem;
  line-height: 1.25;
  margin: 8px 0 20px;
}

.experience-text {
  max-width: 500px;
  margin: 0 0 30px;
  line-height: 1.8;
}

/* FEATURES */
.experience-features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 24px;
}

.experience-features li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: var(--brown-text);
  line-height: 1.5;
}

.feature-check {
  width: 24px;
  height: 24px;
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--lavender);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
}

/* TABLET */
@media (max-width: 960px) {
  .experience-section {
    padding: 70px 0;
  }

  .experience-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .experience-copy {
    max-width: 100%;
  }

  .experience-visual {
    height: 420px;
  }

  .experience-text {
    max-width: 100%;
  }
}

/* MOBILE */
@media (max-width: 560px) {
  .experience-section {
    padding: 55px 0;
  }

  .experience-visual {
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
```
