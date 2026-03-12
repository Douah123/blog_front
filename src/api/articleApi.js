import apiClient from './axios.js'

export const getArticles = () => apiClient.get('/articles')
export const createArticle = (payload) => apiClient.post('/articles', payload)
