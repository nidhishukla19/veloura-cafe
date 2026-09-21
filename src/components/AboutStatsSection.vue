<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import aboutData from '@/data/about.json'
import type { AboutData } from '@/types'

const { stats } = aboutData as AboutData

const sectionRef = ref<HTMLElement | null>(null)
// What's actually shown on screen — starts as each stat's real label and is
// swapped for an animated "0 -> value" version once the strip enters view.
const displayValues = ref<string[]>(stats.map((stat) => stat.value))

let observer: IntersectionObserver | null = null
let hasAnimated = false

// Parses strings like "10+", "5K+" or "4.9" into a leading prefix, the
// numeric part to animate, and a trailing suffix so any format keeps working.
function parseStat(raw: string) {
  const match = raw.match(/^([^\d]*)([\d.]+)(.*)$/)
  if (!match) return { prefix: '', target: 0, decimals: 0, suffix: raw }
  const [, prefix, numberPart, suffix] = match
  const decimals = numberPart.includes('.') ? numberPart.split('.')[1].length : 0
  return { prefix, target: parseFloat(numberPart), decimals, suffix }
}

function animateStats() {
  const duration = 1200
  const startTime = performance.now()
  const parsed = stats.map((stat) => parseStat(stat.value))

  function tick(now: number) {
    const progress = Math.min((now - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic

    displayValues.value = parsed.map(
      ({ prefix, target, decimals, suffix }) => `${prefix}${(target * eased).toFixed(decimals)}${suffix}`
    )

    if (progress < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

onMounted(() => {
  if (!sectionRef.value || typeof IntersectionObserver === 'undefined') {
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      const isVisible = entries.some((entry) => entry.isIntersecting)
      if (isVisible && !hasAnimated) {
        hasAnimated = true
        animateStats()
        observer?.disconnect()
      }
    },
    { threshold: 0.4 }
  )
  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="sectionRef" class="stats-section">
    <div class="container stats-grid">
      <div v-for="(stat, index) in stats" :key="stat.label" class="stat-item fade-in">
        <h3>{{ displayValues[index] }}</h3>
        <p>{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section { background: var(--coffee-dark); padding: 64px 0; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center; }
.stat-item h3 { font-size: 2.4rem; color: #fff; margin-bottom: 8px; font-variant-numeric: tabular-nums; }
.stat-item p { color: #EFD9E2; font-size: 0.9rem; }

@media (max-width: 760px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
}
</style>
