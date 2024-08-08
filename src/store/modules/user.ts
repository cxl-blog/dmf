import { store } from '..'
import type { UserState } from '@/config/user'

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      isLogin: false,
      userInfo: {}
    }
  }
})

export const useUserStoreWithout = () => useUserStore(store)
