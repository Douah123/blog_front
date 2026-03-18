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

export function searchUsers(token, username, params = {}) {
  return apiClient.get(`/search/users${toQuery({ username, ...params })}`, { token })
}

export function sendFriendRequest(token, addresseeId) {
  return apiClient.post('/friends/request', { addressee_id: addresseeId }, { token })
}

export function getFriendRequests(token, params) {
  return apiClient.get(`/get/friends/requests${toQuery(params)}`, { token })
}

export function acceptFriendRequest(token, requesterId) {
  return apiClient.post('/friends/accept', { requester_id: requesterId }, { token })
}

export function rejectFriendRequest(token, requesterId) {
  return apiClient.post('/friends/reject', { requester_id: requesterId }, { token })
}

export function getFriends(token, params) {
  return apiClient.get(`/get/friends${toQuery(params)}`, { token })
}

export function removeFriend(token, friendId) {
  return apiClient.post('/friends/remove', { friend_id: friendId }, { token })
}

export function blockUser(token, targetUserId) {
  return apiClient.post('/friends/block', { target_user_id: targetUserId }, { token })
}

export function unblockUser(token, targetUserId) {
  return apiClient.post('/friends/unblock', { target_user_id: targetUserId }, { token })
}

export function uploadMyAvatar(token, file) {
  const formData = new FormData()
  formData.append('avatar', file)
  return apiClient.post('/users/me/avatar', formData, { token })
}
