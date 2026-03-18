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

export function getFeed(token, params) {
  return apiClient.get(`/articles/feed${toQuery(params)}`, { token })
}

export function getMyArticles(token, params) {
  return apiClient.get(`/articles/me${toQuery(params)}`, { token })
}

export function getArticleById(token, articleId) {
  return apiClient.get(`/articles/${articleId}`, { token })
}

export function createArticle(token, payload) {
  return apiClient.post('/create/article', payload, { token })
}

export function updateArticle(token, articleId, payload) {
  return apiClient.put(`/articles/${articleId}`, payload, { token })
}

export function deleteArticle(token, articleId) {
  return apiClient.delete(`/articles/${articleId}`, { token })
}
