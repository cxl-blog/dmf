import request from '@/utils/request'

export const categoryList = () => request.get('/categories')

export const detail = (id: string) => request.get(`/trigrams/${id}`)
