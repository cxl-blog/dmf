// #ifdef MP-WEIXIN
<script lang="ts">
// 微信小程序 样式穿透
export default {
  options: { styleIsolation: 'shared' }
}
</script>
// #endif

<script setup lang="ts">
const systemStore = useSystemStore()
const appStore = useAppStore()

appStore.startLoading()

onLaunch(() => {
  if (!wx.cloud) {
    console.error('初始化失败')
  } else {
    wx.cloud.init({
      env: import.meta.env.VITE_WEIXIN_CLOUD_ENV,
      traceUser: true
    })
  }

  systemStore.getToggles().finally(() => {
    nextTick(appStore.endLoading)
  })

  const updateManager = wx.getUpdateManager()

  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate)
  })

  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })

  updateManager.onUpdateFailed(function () {
    // 新版本下载失败
  })
})

onHide(() => {
  console.debug('App Hide')
})

onBeforeMount(() => {
  console.debug('vue before mounded')
})
</script>

<style lang="scss">
body {
  background-color: $u-bg-color;
  height: 100vh !important;
}
</style>
