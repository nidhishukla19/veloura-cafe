<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import AuthLayout from '@/components/AuthLayout.vue'

const router = useRouter()
const route = useRoute()

const { login } = useAuth()

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const showPassword = ref(false)
const status = ref<'idle' | 'loading' | 'error' | 'success'>('idle')
const serverError = ref('')

const touched = reactive({
  email: false,
  password: false
})

const emailError = computed(() => {
  if (!touched.email) return ''

  if (!form.email) {
    return 'Email is required.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return 'Please enter a valid email address.'
  }

  return ''
})

const passwordError = computed(() => {
  if (!touched.password) return ''

  if (!form.password) {
    return 'Password is required.'
  }

  if (form.password.length < 8) {
    return 'Password must be at least 8 characters.'
  }

  return ''
})

const isFormValid = computed(() => {
  return (
    !!form.email &&
    !emailError.value &&
    form.password.length >= 8 &&
    !passwordError.value
  )
})

async function handleSubmit() {
  touched.email = true
  touched.password = true
  serverError.value = ''

  if (!isFormValid.value) {
    return
  }

  status.value = 'loading'

  try {
    const res = await login({
      email: form.email,
      password: form.password
    })

    if (res.success) {
      status.value = 'success'

      setTimeout(() => {
        const redirect =
          typeof route.query.redirect === 'string'
            ? route.query.redirect
            : '/'

        router.push(redirect)
      }, 700)
    } else {
      status.value = 'error'
      serverError.value = res.message || 'Invalid email or password.'
    }
  } catch (err) {
    status.value = 'error'

    serverError.value =
      err instanceof Error
        ? err.message
        : 'Something went wrong. Please try again.'
  }
}
</script>

<template>
  <AuthLayout
    heading="Welcome back to Veloura Café"
    tagline="Your favorite coffee moments are waiting for you."
    image="/images/auth/login.webp"
  >

    <!-- HEADING -->
    <h1 class="auth-heading">
      Welcome Back
    </h1>

    <p class="auth-subtext">
      Sign in to continue your coffee journey.
    </p>

    <!-- SUCCESS -->
    <div
      v-if="status === 'success'"
      class="form-banner success"
    >
      Login successful! Redirecting…
    </div>

    <!-- ERROR -->
    <div
      v-else-if="status === 'error' && serverError"
      class="form-banner error"
    >
      {{ serverError }}
    </div>

    <!-- LOGIN FORM -->
    <form
      novalidate
      @submit.prevent="handleSubmit"
    >

      <!-- EMAIL -->
      <div class="field-group">

        <label
          class="field-label"
          for="login-email"
        >
          Email
        </label>

        <input
          id="login-email"
          v-model="form.email"
          type="email"
          class="field-input"
          :class="{ 'has-error': emailError }"
          placeholder="you@example.com"
          autocomplete="email"
          @blur="touched.email = true"
        />

        <p
          v-if="emailError"
          class="field-error"
        >
          {{ emailError }}
        </p>

      </div>

      <!-- PASSWORD -->
      <div class="field-group">

        <label
          class="field-label"
          for="login-password"
        >
          Password
        </label>

        <div class="password-wrapper">

          <input
            id="login-password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            class="field-input"
            :class="{ 'has-error': passwordError }"
            placeholder="Enter your password"
            autocomplete="current-password"
            @blur="touched.password = true"
          />

          <button
            type="button"
            class="password-toggle"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? '🙈' : '👁' }}
          </button>

        </div>

        <p
          v-if="passwordError"
          class="field-error"
        >
          {{ passwordError }}
        </p>

      </div>

      <!-- REMEMBER + FORGOT -->
      <div class="field-row">

        <label class="checkbox-label">
          <input
            v-model="form.remember"
            type="checkbox"
          />

          <span>
            Remember me
          </span>
        </label>

        <RouterLink
          to="/forgot-password"
          class="link-muted"
        >
          Forgot password?
        </RouterLink>

      </div>

      <!-- SUBMIT -->
      <button
        class="btn btn-primary auth-submit"
        type="submit"
        :disabled="
          status === 'loading' ||
          status === 'success'
        "
      >
        {{
          status === 'loading'
            ? 'Signing in…'
            : 'Sign In'
        }}
      </button>

    </form>

    <!-- SIGNUP -->
    <p class="auth-switch">
      Don't have an account?

      <RouterLink
        to="/signup"
        class="link-muted"
      >
        Create Account
      </RouterLink>
    </p>

  </AuthLayout>
</template>

<style scoped>
.auth-heading {
  margin: 0 0 8px;
  font-size: 2rem;
  line-height: 1.2;
  color: #4a2c25;
}

.auth-subtext {
  margin: 0 0 28px;
  color: #806b65;
  line-height: 1.6;
}

.field-group {
  margin-bottom: 18px;
}

.field-label {
  display: block;
  margin-bottom: 7px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a2c25;
}

.field-input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #dbcac5;
  border-radius: 10px;
  padding: 12px 14px;
  background: #fff;
  color: #4a2c25;
  outline: none;
  transition: 0.2s ease;
}

.field-input:focus {
  border-color: #b58baf;
  box-shadow: 0 0 0 3px rgba(181, 139, 175, 0.12);
}

.field-input.has-error {
  border-color: #c1502f;
}

.field-error {
  margin: 6px 0 0;
  color: #c1502f;
  font-size: 0.8rem;
}

.password-wrapper {
  position: relative;
}

.password-wrapper .field-input {
  padding-right: 48px;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
}

.field-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6f5b55;
  font-size: 0.85rem;
}

.link-muted {
  color: #8e6688;
  text-decoration: none;
  font-weight: 600;
}

.link-muted:hover {
  text-decoration: underline;
}

.btn {
  width: 100%;
  border: 0;
  border-radius: 10px;
  padding: 13px 18px;
  cursor: pointer;
  font-weight: 700;
}

.btn-primary {
  background: #8e6688;
  color: white;
}

.btn-primary:hover {
  background: #795473;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-submit {
  margin-top: 4px;
}

.auth-switch {
  margin: 24px 0 0;
  text-align: center;
  color: #806b65;
  font-size: 0.9rem;
}

.form-banner {
  padding: 12px 14px;
  border-radius: 8px;
  margin-bottom: 18px;
  font-size: 0.9rem;
}

.form-banner.success {
  background: #edf7ee;
  color: #397044;
}

.form-banner.error {
  background: #fff0ed;
  color: #a43f27;
}
</style>