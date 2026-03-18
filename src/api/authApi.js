import apiClient from './axios.js'

export function login(credentials) {
  return apiClient.post('/auth/login', credentials)
}

export function register(payload) {
  return apiClient.post('/auth/register', payload)
}

export function getProfile(token) {
  return apiClient.get('/auth/me', { token })
}

export function logout(token) {
  return apiClient.post('/auth/logout', {}, { token })
}
