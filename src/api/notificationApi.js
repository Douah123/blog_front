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

export function getNotifications(token, params) {
  return apiClient.get(`/notifications${toQuery(params)}`, { token })
}

export function getUnreadCount(token) {
  return apiClient.get('/notifications/unread-count', { token })
}

export function markNotificationRead(token, notificationId) {
  return apiClient.put(`/notifications/${notificationId}/read`, {}, { token })
}

export function markAllNotificationsRead(token) {
  return apiClient.put('/notifications/read-all', {}, { token })
}
