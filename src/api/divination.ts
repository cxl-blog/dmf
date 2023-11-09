import request from '@/utils/request'

export const categoryList = () => request.get('/categories')

export const divinationDetail = (id: string) => request.get(`/trigrams/${id}`)

export const customerTrigrams = () => request.post('/customer-trigrams')
