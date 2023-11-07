/**
 * @description 路由拦截器
 */

const interceptors = ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch']

interceptors.forEach(path => {
  uni.addInterceptor(path, {
    invoke(result) {
      console.log({ result })
      return true
    }
  })
})
