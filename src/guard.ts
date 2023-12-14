/**
 * @description 路由拦截器
 */

const interceptors = ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch', 'navigateBack']
const appStore = useAppStoreWithout()
const { pageLoading } = storeToRefs(appStore)

interceptors.forEach(path => {
  uni.addInterceptor(path, {
    invoke() {
      pageLoading.value = true

      return true
    },
    complete() {
      pageLoading.value = false
    }
  })
})
