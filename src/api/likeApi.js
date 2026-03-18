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

export function likeArticle(token, articleId) {
  return apiClient.post(`/articles/${articleId}/like`, {}, { token })
}

export function unlikeArticle(token, articleId) {
  return apiClient.delete(`/articles/${articleId}/like`, { token })
}

export function getArticleLikes(token, articleId, params) {
  return apiClient.get(`/articles/${articleId}/likes${toQuery(params)}`, { token })
}
