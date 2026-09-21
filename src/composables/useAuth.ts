import { reactive, computed } from 'vue'
import type { User, SignupPayload, LoginPayload, AuthResponse } from '@/types'
import { signupUser, loginUser } from '@/services/api'

const STORAGE_KEY = 'cafe-amour-user'

// "Remember me" checked -> persist across browser restarts (localStorage).
// Unchecked -> persist only for this tab session (sessionStorage).
function loadStoredUser(): User | null {
  try {
    const fromLocal = localStorage.getItem(STORAGE_KEY)
    if (fromLocal) return JSON.parse(fromLocal) as User
    const fromSession = sessionStorage.getItem(STORAGE_KEY)
    return fromSession ? (JSON.parse(fromSession) as User) : null
  } catch {
    return null
  }
}

// Module-scope reactive singleton — shared by every component that calls
// useAuth(), same pattern as useCart.ts.
const state = reactive({
  user: loadStoredUser() as User | null
})

function persist(user: User | null, rememberMe: boolean) {
  localStorage.removeItem(STORAGE_KEY)
  sessionStorage.removeItem(STORAGE_KEY)
  if (!user) return
  if (rememberMe) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } else {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }
}

async function login(payload: LoginPayload, rememberMe = true): Promise<AuthResponse> {
  const res = await loginUser(payload)
  if (res.success && res.user) {
    state.user = res.user
    persist(res.user, rememberMe)
  }
  return res
}

async function signup(payload: SignupPayload): Promise<AuthResponse> {
  // New accounts are not auto-logged-in — the flow redirects to Login,
  // per the requested Sign Up -> success -> redirect-to-Login flow.
  return signupUser(payload)
}

function logout() {
  state.user = null
  persist(null, false)
}

export function useAuth() {
  return {
    user: computed(() => state.user),
    isLoggedIn: computed(() => !!state.user),
    login,
    signup,
    logout
  }
}
