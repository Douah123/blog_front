import apiClient from './axios.js'

export const getMessages = () => apiClient.get('/messages')
export const sendMessage = (payload) => apiClient.post('/messages', payload)
