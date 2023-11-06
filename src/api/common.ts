import request from '@/utils/request'

export const categories = () => request.get('/categories')

export const detail = (id: string) => request.get(`/trigrams/${id}`)
