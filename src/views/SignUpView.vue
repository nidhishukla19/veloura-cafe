<template>
  <div class="signup-page">

    <!-- LEFT IMAGE -->
    <section class="signup-image">
      <img
        src="/images/auth/signup.webp"
        alt="Veloura Café"
      />

      <div class="image-overlay"></div>

      <div class="image-content">
        <div class="logo">VELOURA</div>

        <div>
          <h2>Join the Veloura Café family</h2>
          <p>
            Create an account and enjoy your favorite
            coffee moments with us.
          </p>
        </div>
      </div>
    </section>

    <!-- RIGHT FORM -->
    <section class="signup-form-area">
      <div class="form-box">

        <div class="header">
          <span>VELOURA CAFÉ</span>
          <h1>Create Your Account</h1>
          <p>A few details and you're ready to order.</p>
        </div>

        <form @submit.prevent="createAccount">

          <div class="field">
            <label>Full Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          <div class="field">
            <label>Email Address</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div class="field">
            <label>
              Phone Number
              <small>(optional)</small>
            </label>

            <input
              v-model="form.phone"
              type="tel"
              placeholder="+91 98765 43210"
            />
          </div>

          <div class="field">
            <label>Password</label>

            <div class="password">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Create a password"
              />

              <button
                type="button"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <div class="requirements">
            <span :class="{ valid: form.password.length >= 8 }">
              {{ form.password.length >= 8 ? '✓' : '○' }}
              8+ characters
            </span>

            <span :class="{ valid: /[A-Z]/.test(form.password) }">
              {{ /[A-Z]/.test(form.password) ? '✓' : '○' }}
              Uppercase letter
            </span>

            <span :class="{ valid: /[0-9]/.test(form.password) }">
              {{ /[0-9]/.test(form.password) ? '✓' : '○' }}
              Number
            </span>

            <span :class="{ valid: /[^A-Za-z0-9]/.test(form.password) }">
              {{ /[^A-Za-z0-9]/.test(form.password) ? '✓' : '○' }}
              Special character
            </span>
          </div>

          <div class="field">
            <label>Confirm Password</label>

            <div class="password">
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm your password"
              />

              <button
                type="button"
                @click="
                  showConfirmPassword = !showConfirmPassword
                "
              >
                {{ showConfirmPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <label class="terms">
            <input
              v-model="form.terms"
              type="checkbox"
            />

            <span>
              I agree to the
              <a href="#" @click.prevent>Terms & Conditions</a>
              and
              <a href="#" @click.prevent>Privacy Policy</a>
            </span>
          </label>

          <p
            v-if="error"
            class="error"
          >
            {{ error }}
          </p>

          <button
            type="submit"
            class="create-button"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Creating Account...' : 'Create Account' }}
          </button>

        </form>

        <div class="login">
          Already have an account?
          <RouterLink to="/login">
            Sign In
          </RouterLink>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { signup } = useAuth()

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const error = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  terms: false
})

const isSubmitting = ref(false)

async function createAccount() {
  error.value = ''

  if (!form.name.trim()) {
    error.value = 'Please enter your name.'
    return
  }

  if (!form.email.trim()) {
    error.value = 'Please enter your email.'
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    error.value = 'Please enter a valid email address.'
    return
  }

  if (form.password.length < 8) {
    error.value = 'Password must contain at least 8 characters.'
    return
  }

  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match.'
    return
  }

  if (!form.terms) {
    error.value = 'Please accept the terms and conditions.'
    return
  }

  isSubmitting.value = true

  try {
    const res = await signup({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password
    })

    if (res.success) {
      router.push('/login')
    } else {
      error.value = res.message || 'Could not create your account.'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.signup-page {
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #fff8f6;
}

/* IMAGE */

.signup-image {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.signup-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(70, 40, 65, 0.05),
    rgba(70, 40, 65, 0.65)
  );
}

.image-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  padding: 45px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logo {
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 0.25em;
}

.image-content h2 {
  margin: 0 0 12px;
  max-width: 430px;
  font-size: 2.2rem;
  line-height: 1.15;
}

.image-content p {
  margin: 0;
  max-width: 390px;
  color: #f7e8f1;
  line-height: 1.6;
}

/* FORM */

.signup-form-area {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.form-box {
  width: 100%;
  max-width: 410px;
}

.header {
  margin-bottom: 25px;
}

.header > span {
  color: #9a7092;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.18em;
}

.header h1 {
  margin: 8px 0;
  color: #4a3044;
  font-size: 2rem;
}

.header p {
  margin: 0;
  color: #897680;
  font-size: 0.9rem;
}

/* FIELDS */

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  color: #4a3044;
  font-size: 0.8rem;
  font-weight: 700;
}

.field small {
  color: #a28f99;
  font-weight: 400;
}

.field input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 13px;
  border: 1px solid #dfd1dc;
  border-radius: 9px;
  outline: none;
  background: white;
  color: #4a3044;
  font-size: 0.88rem;
}

.field input:focus {
  border-color: #a77a9d;
  box-shadow: 0 0 0 3px rgba(167, 122, 157, 0.12);
}

/* PASSWORD */

.password {
  position: relative;
}

.password input {
  padding-right: 60px;
}

.password button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  color: #93698b;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
}

/* REQUIREMENTS */

.requirements {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin-top: -5px;
}

.requirements span {
  color: #a7969f;
  font-size: 0.67rem;
}

.requirements span.valid {
  color: #62866b;
}

/* TERMS */

.terms {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #81717a;
  font-size: 0.72rem;
  line-height: 1.5;
  margin-top: 2px;
}

.terms input {
  margin-top: 2px;
  accent-color: #96708e;
}

.terms a {
  color: #906789;
  font-weight: 700;
  text-decoration: none;
}

/* ERROR */

.error {
  margin: -3px 0 0;
  color: #b44d60;
  font-size: 0.73rem;
}

/* BUTTON */

.create-button {
  width: 100%;
  border: none;
  border-radius: 9px;
  padding: 13px;
  background: #93698b;
  color: white;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.create-button:hover {
  background: #76526f;
  transform: translateY(-1px);
}

/* LOGIN */

.login {
  text-align: center;
  margin-top: 23px;
  color: #897780;
  font-size: 0.78rem;
}

.login a {
  color: #93698b;
  font-weight: 700;
  text-decoration: none;
}

/* MOBILE */

@media (max-width: 850px) {
  .signup-page {
    grid-template-columns: 1fr;
  }

  .signup-image {
    min-height: 280px;
    height: 280px;
  }

  .image-content {
    padding: 28px;
  }

  .image-content h2 {
    font-size: 1.5rem;
  }

  .image-content p {
    display: none;
  }

  .signup-form-area {
    padding: 35px 22px;
  }
}

@media (max-width: 500px) {
  .signup-image {
    min-height: 220px;
    height: 220px;
  }

  .requirements {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 1.65rem;
  }
}
</style>