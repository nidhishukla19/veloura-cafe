import type {
  MenuItem,
  Review,
  GalleryItem,
  Order,
  OrderResponse,
  ContactMessage,
  ContactResponse,
  SignupPayload,
  LoginPayload,
  AuthResponse
} from '@/types'

// Vite's dev-server proxy (see vite.config.ts) forwards /api/* to the
// Express server in server/server.js, so a relative path works in both
// dev and a same-origin production deployment.
const BASE_URL = '/api'

export async function getMenu(): Promise<MenuItem[]> {
  const response = await fetch(`${BASE_URL}/menu`)
  if (!response.ok) {
    throw new Error('Failed to fetch menu')
  }
  return response.json()
}

export async function getReviews(): Promise<Review[]> {
  const response = await fetch(`${BASE_URL}/reviews`)
  if (!response.ok) {
    throw new Error('Failed to fetch reviews')
  }
  return response.json()
}

export async function getGallery(): Promise<GalleryItem[]> {
  const response = await fetch(`${BASE_URL}/gallery`)
  if (!response.ok) {
    throw new Error('Failed to fetch gallery')
  }
  return response.json()
}

export async function createOrder(order: Order): Promise<OrderResponse> {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })
  if (!response.ok) {
    throw new Error('Failed to place order')
  }
  return response.json()
}

export async function sendContactMessage(message: ContactMessage): Promise<ContactResponse> {
  const response = await fetch(`${BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  })
  if (!response.ok) {
    throw new Error('Failed to send message')
  }
  return response.json()
}

export async function signupUser(payload: SignupPayload): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  const data: AuthResponse = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Failed to sign up')
  }
  return data
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  const data: AuthResponse = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Failed to log in')
  }
  return data
}
