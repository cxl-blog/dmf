import request from '@/utils/request'

export const categoryList = () => request.get('/categories')

export const divinationDetail = (id: string, data) => request.get(`/trigrams/${id}`, data)

export const customerTrigrams = data => request.post('/customer-trigrams', data)

export const trigrams = () => request.get('/trigrams')
