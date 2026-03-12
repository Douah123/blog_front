import apiClient from './axios.js'

export const getNotifications = () => apiClient.get('/notifications')
export const markNotificationAsRead = (notificationId) =>
  apiClient.put(`/notifications/${notificationId}/read`, {})
