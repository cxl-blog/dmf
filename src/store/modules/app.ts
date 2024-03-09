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
      layout: {
        navbarHeight: 0,
        statusHeight: 0
      }
    }
  },
  actions: {
    startLoading() {
      this.pageLoading = true
    },
    endLoading() {
      this.pageLoading = false
    },
    updateLayout(data: Partial<AppState['layout']>) {
      Object.assign(this.layout, data)
    }
  }
})

export const useAppStoreWithout = () => useAppStore(store)
