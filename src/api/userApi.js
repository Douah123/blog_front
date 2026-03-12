import apiClient from './axios.js'

export const searchUsers = (query) =>
  apiClient.get(`/users?search=${encodeURIComponent(query)}`)

export const getUserById = (userId) => apiClient.get(`/users/${userId}`)
