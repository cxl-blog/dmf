import { pages } from 'virtual:uni-pages'
import { store } from '..'
import type { AppState } from '@/config/app'

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      title: '',
      pages,
      pageLoading: false,
      scheme: uni.getSystemInfoSync().hostTheme as any,
      navbarHeight: 0
    }
  },
  actions: {
    startLoading() {
      this.pageLoading = true
    },
    endLoading() {
      this.pageLoading = false
    }
  }
})

export const useAppStoreWithout = () => useAppStore(store)
