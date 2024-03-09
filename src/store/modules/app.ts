import { pages, subPackages } from 'virtual:uni-pages'
import { store } from '..'
import type { AppState } from '@/config/app'

const subPages: PageConfig[] = []
for (const item of subPackages) {
  const { root, pages } = item
  for (const page of pages as PageConfig[]) {
    subPages.push({
      ...page,
      path: `${root}/${page.path}`
    })
  }
}

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      title: '',
      pages: [...pages, ...subPages],
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
