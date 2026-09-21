<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const offers = [
  '/images/offers/offer-1.webp',
  '/images/offers/offer-2.webp',
  '/images/offers/offer-3.webp'
]

const currentOffer = ref(0)

let interval: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  interval = setInterval(() => {
    currentOffer.value = (currentOffer.value + 1) % offers.length
  }, 3000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<template>
  <section class="offer-section">
    <div class="container offer-inner fade-in">

      <div class="offer-copy">
        <p class="offer-label">Special Offer</p>

        <h2>
          Coffee + Love<br />
          Always a Good Idea
        </h2>

        <p class="offer-text">
          Get 20% OFF on all beverages every Monday!
        </p>

        <RouterLink to="/menu" class="btn btn-primary">
          Grab Offer →
        </RouterLink>
      </div>

      <div class="offer-visual">
        <img
          :src="offers[currentOffer]"
          alt="Special café offer"
          loading="lazy"
          decoding="async"
        />

        <div class="offer-dots">
          <span
            v-for="(_, index) in offers"
            :key="index"
            :class="{ active: currentOffer === index }"
          ></span>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.offer-section {
  background: var(--coffee-dark);
  padding: 64px 0;
}

.offer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.offer-copy {
  flex: 1;
  min-width: 300px;
}

.offer-label {
  color: var(--gold-pink);
  font-size: 0.85rem;
  margin-bottom: 10px;
}

.offer-copy h2 {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 12px;
}

.offer-text {
  color: #efd9e2;
  max-width: 380px;
  margin-bottom: 22px;
}

.offer-copy .btn-primary {
  background: #fff;
  color: var(--mauve-dark);
  box-shadow: none;
}

.offer-copy .btn-primary:hover {
  background: var(--cream);
}

.offer-visual {
  position: relative;
  width: 100%;
  max-width: 520px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #2b1b18;
}

.offer-visual img {
  width: 100%;
  height: 320px;
  object-fit: contain;
  display: block;
}

.offer-dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.offer-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
}

.offer-dots span.active {
  background: #fff;
  transform: scale(1.25);
}

@media (max-width: 760px) {
  .offer-inner {
    flex-direction: column;
    text-align: center;
  }

  .offer-text {
    margin-left: auto;
    margin-right: auto;
  }

  .offer-visual {
    max-width: 100%;
  }

  .offer-visual img {
    height: 260px;
  }
}
</style>