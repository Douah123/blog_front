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

export function getCommentsByArticle(token, articleId, params) {
  return apiClient.get(`/articles/${articleId}/comments${toQuery(params)}`, { token })
}

export function createComment(token, payload) {
  return apiClient.post('/comments', payload, { token })
}

export function updateComment(token, commentId, payload) {
  return apiClient.put(`/comments/${commentId}`, payload, { token })
}

export function deleteComment(token, commentId) {
  return apiClient.delete(`/comments/${commentId}`, { token })
}
