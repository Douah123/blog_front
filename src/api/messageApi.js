import apiClient from './axios.js'

function toQuery(params = {}) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value)
    }
  })

  const queryString = query.toString()
  return queryString ? `?${queryString}` : ''
}

export function getMyChats(token, params) {
  return apiClient.get(`/chat/my${toQuery(params)}`, { token })
}

export function getConversation(token, otherUserId, params) {
  return apiClient.get(`/chat/conversation/${otherUserId}${toQuery(params)}`, { token })
}

export function sendMessage(token, payload) {
  return apiClient.post('/chat/messages', payload, { token })
}
