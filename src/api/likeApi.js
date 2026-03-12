import apiClient from './axios.js'

export const likeArticle = (articleId) =>
  apiClient.post(`/articles/${articleId}/likes`, {})

export const unlikeArticle = (articleId) =>
  apiClient.delete(`/articles/${articleId}/likes`)
