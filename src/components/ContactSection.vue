<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ContactMessage } from '@/types'
import { sendContactMessage } from '@/services/api'

const form = reactive<ContactMessage>({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const feedback = ref('')

async function submitForm() {
  status.value = 'loading'
  feedback.value = ''

  try {
    const res = await sendContactMessage(form)

    status.value = 'success'
    feedback.value = res.message

    form.name = ''
    form.email = ''
    form.phone = ''
    form.message = ''
  } catch (e) {
    status.value = 'error'
    feedback.value = 'Something went wrong. Please try again.'
  }
}
</script>

<template>
  <section class="contact-section section">
    <div class="container contact-grid">

      <!-- LEFT -->
      <div class="contact-info fade-in">
        <h2>Visit Veloura Café ♡</h2>

        <p class="subtitle">
          Slow down. Sip. Stay awhile.
        </p>

        <ul class="info-list">
          <li>
            <span class="info-icon">📍</span>
            <span>123 Coffee Lane, Jaipur, Rajasthan</span>
          </li>

          <li>
            <span class="info-icon">🕐</span>
            <span>Mon – Sun : 8:00 AM – 10:00 PM</span>
          </li>

          <li>
            <span class="info-icon">📞</span>
            <span>+91 98765 43210</span>
          </li>

          <li>
            <span class="info-icon">✉️</span>
            <span>hello@veloura.cafe</span>
          </li>
        </ul>

        <!-- Main Image -->
        <div class="contact-image main-image img-zoom">
          <img
            src="/images/contact/cafe-exterior.webp"
            alt="Veloura Café exterior"
            loading="lazy"
            decoding="async"
          />
        </div>

        <!-- Secondary Images -->
        <div class="contact-image-grid">
          <div class="contact-image img-zoom">
            <img
              src="/images/contact/cafe-interior.webp"
              alt="Veloura Café interior"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="contact-image img-zoom">
            <img
              src="/images/contact/location.webp"
              alt="Veloura Café location"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <form
        class="contact-form"
        @submit.prevent="submitForm"
      >
        <h3>Send us a message</h3>

        <p class="form-intro">
          We'd love to hear from you. Fill in the details below and we'll get
          back to you soon.
        </p>

        <input
          v-model="form.name"
          type="text"
          placeholder="Your Name"
          autocomplete="name"
          required
        />

        <input
          v-model="form.email"
          type="email"
          placeholder="Your Email"
          autocomplete="email"
          required
        />

        <input
          v-model="form.phone"
          type="tel"
          placeholder="Your Phone"
          autocomplete="tel"
        />

        <textarea
          v-model="form.message"
          placeholder="Your Message"
          rows="5"
          required
        ></textarea>

        <button
          class="btn btn-primary"
          type="submit"
          :disabled="status === 'loading'"
        >
          {{ status === 'loading' ? 'Sending…' : 'Send Message' }}
        </button>

        <p
          v-if="status === 'success'"
          class="form-feedback success"
        >
          {{ feedback }}
        </p>

        <p
          v-if="status === 'error'"
          class="form-feedback error"
        >
          {{ feedback }}
        </p>
      </form>

    </div>
  </section>
</template>

<style scoped>
.contact-section {
  width: 100%;
}

.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.85fr);
  gap: 56px;
  align-items: start;
}

/* Contact Information */
.contact-info h2 {
  margin: 0;
  line-height: 1.15;
}

.contact-info .subtitle {
  margin: 8px 0 24px;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0 0 26px;

  display: flex;
  flex-direction: column;
  gap: 13px;
}

.info-list li {
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 0.94rem;
  line-height: 1.5;
}

.info-icon {
  width: 24px;
  min-width: 24px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Images */
.contact-image {
  overflow: hidden;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  background: #f4eff8;
}

.contact-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.contact-image:hover img {
  transform: scale(1.04);
}

/* All three source photos are 3:2 (1536x1024). Sizing by aspect-ratio
   instead of a fixed pixel height keeps the crop predictable at every
   breakpoint — the box can never end up a wildly different shape from
   the photo, so nothing stretches or gets severely cut. */
.main-image {
  width: 100%;
  aspect-ratio: 16 / 10;
  margin-bottom: 16px;
}

/* The "Veloura Café" signage sits across the top of the exterior shot,
   so bias the crop upward to keep the sign in frame. */
.main-image img {
  object-position: center 38%;
}

.contact-image-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* 3:2 matches the source exactly — both thumbnails stay equal in size
   and show the full photo with no cropping at all. */
.contact-image-grid .contact-image {
  aspect-ratio: 3 / 2;
}

/* Interior: the counter and seating read best slightly above centre. */
.contact-image-grid .contact-image:first-child img {
  object-position: center 45%;
}

/* Location card: keep the printed map centred in frame. */
.contact-image-grid .contact-image:last-child img {
  object-position: center center;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 13px;

  background: #fff;
  padding: 30px;

  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);

  border: 1px solid var(--border-soft);
}

.contact-form h3 {
  margin: 0;
  font-size: 1.3rem;
  line-height: 1.3;
}

.form-intro {
  margin: -2px 0 5px;
  font-size: 0.88rem;
  line-height: 1.6;
  opacity: 0.72;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  box-sizing: border-box;

  padding: 13px 16px;

  border-radius: var(--radius-sm);
  border: 1px solid var(--border-soft);

  font-family: var(--font-body);
  font-size: 0.92rem;

  color: inherit;
  background: #fff;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.contact-form input {
  min-height: 46px;
}

.contact-form textarea {
  resize: vertical;
  min-height: 125px;
  line-height: 1.5;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: var(--mauve);
  box-shadow: 0 0 0 3px rgba(150, 120, 170, 0.1);
}

.contact-form button {
  align-self: flex-start;
  margin-top: 5px;
}

.contact-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Feedback */
.form-feedback {
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 4px 0 0;
}

.form-feedback.success {
  color: #3f7d4a;
}

.form-feedback.error {
  color: #b23b3b;
}

/* Tablet */
@media (max-width: 960px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 42px;
  }

  .contact-form {
    width: 100%;
    box-sizing: border-box;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .contact-grid {
    gap: 34px;
  }

  .contact-info h2 {
    font-size: 1.8rem;
  }

  .info-list {
    gap: 11px;
  }

  .info-list li {
    align-items: flex-start;
    font-size: 0.9rem;
  }

  .main-image {
    margin-bottom: 14px;
  }

  /* Single column on phones: each thumbnail goes full width at its
     native 3:2, so nothing becomes excessively cropped. */
  .contact-image-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .contact-form {
    padding: 22px;
    gap: 12px;
  }

  .contact-form h3 {
    font-size: 1.2rem;
  }

  .contact-form button {
    width: 100%;
    align-self: stretch;
  }
}

/* Small Mobile */
@media (max-width: 380px) {
  .contact-form {
    padding: 18px;
  }
}
</style>