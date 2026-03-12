import apiClient from './axios.js'

export const login = (credentials) => apiClient.post('/auth/login', credentials)
export const register = (payload) => apiClient.post('/auth/register', payload)
export const getProfile = () => apiClient.get('/auth/me')
