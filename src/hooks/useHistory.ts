import type { DivinationDetail } from '@/config/divination'

const key = 'divination_list'
const MAX_COUNT = 50

export function useHistory() {
  function addItem(item: DivinationDetail, callback?: Fn) {
    const data: any[] = uni.getStorageSync(key) || []
    data.length > MAX_COUNT && data.shift()
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
