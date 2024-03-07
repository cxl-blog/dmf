import type { DivinationDetail } from '@/config/divination'

const key = 'divination_list'

export function useHistory() {
  function addItem(item: DivinationDetail, callback?: Fn) {
    const data = uni.getStorageSync(key) || []
    uni.setStorage({
      key,
      data: [...data, item],
      success: callback
    })
  }

  function removeItem(item: DivinationDetail) {
    console.log({ item })
  }

  function clear(callback?: Fn) {
    uni.setStorage({
      key,
      data: [],
      success: callback
    })
  }

  function getData(): DivinationDetail[] {
    return uni.getStorageSync(key) || []
  }

  return {
    addItem,
    removeItem,
    clear,
    getData
  }
}
