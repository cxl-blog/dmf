import { pages } from 'virtual:uni-pages'
import { store } from '..'
import type { AppState } from '@/config/app'

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      title: '',
      pages,
      pageLoading: false,
      scheme: uni.getSystemInfoSync().hostTheme as any
    }
  }
})

export const useAppStoreWithout = () => useAppStore(store)
