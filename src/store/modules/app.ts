import { pages } from 'virtual:uni-pages'
import { store } from '..'
import type { AppState } from '@/config/app'

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      title: '',
      pages
    }
  }
})

export const useAppStoreWithout = () => useAppStore(store)
