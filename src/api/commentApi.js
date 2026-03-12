import apiClient from './axios.js'

export const getCommentsByArticle = (articleId) =>
  apiClient.get(`/articles/${articleId}/comments`)
export const createComment = (articleId, payload) =>
  apiClient.post(`/articles/${articleId}/comments`, payload)
