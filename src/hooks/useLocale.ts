export function useLocale() {
  function getLocale(): LocaleType {
    try {
      return uni.getStorageSync('language') || 'zh-CN'
    } catch (error) {
      return 'zh-CN'
    }
  }

  function setLocale(val: LocaleType) {
    uni.setStorageSync('language', val)
  }

  return {
    getLocale,
    setLocale
  }
}
