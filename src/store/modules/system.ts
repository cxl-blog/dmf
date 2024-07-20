import { toggles } from '@/api/divination'
import type { SystemState } from '@/config/system'

export const useSystemStore = defineStore('system', {
  state: (): SystemState => {
    return {
      aiChatEnabled: true,
      checker: true,
      divinatoryList: true,
      pushEnabled: true,
      quickStart: true
    }
  },
  actions: {
    getToggles() {
      toggles().then(res => {
        Object.assign(this, res)
      })
    }
  }
})
