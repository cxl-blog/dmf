import { toggles } from '@/api/divination'
import type { SystemState } from '@/config/system'

export const useSystemStore = defineStore('system', {
  state: (): SystemState => {
    return {
      aiChatEnabled: false,
      checker: false,
      divinatoryList: false,
      pushEnabled: false,
      quickStart: false,
      sharable: false
    }
  },
  actions: {
    async getToggles() {
      await toggles().then(res => {
        Object.assign(this, res)
      })
    }
  }
})
