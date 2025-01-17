import type { DivinationState } from '@/config/divination'

/**
 * @description 占卜相关的store
 */
export const useDivinationStore = defineStore('divination', {
  state: (): DivinationState => {
    return {
      category: 1,
      mode: '事业'
    }
  }
})
