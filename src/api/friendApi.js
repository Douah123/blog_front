import apiClient from './axios.js'

export const getFriends = () => apiClient.get('/friends')
export const sendFriendRequest = (friendId) =>
  apiClient.post('/friends/requests', { friendId })
