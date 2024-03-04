import { tryOnBeforeUnmount } from '@vueuse/core'
import type { DebounceSettings } from 'lodash-es'
import { debounce } from 'lodash-es'

/**
 * 防抖函数，卸载组件的时候需要清除防抖函数
 * see {@link import('lodash-es').debounce}
 */
export function useDebounce(fn: Fn, wait: number, options?: DebounceSettings) {
  const handler = debounce(fn, wait, options)

  tryOnBeforeUnmount(() => {
    handler?.cancel()
  })

  return handler
}
