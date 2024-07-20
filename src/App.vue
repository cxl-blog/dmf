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

onLaunch(() => {
  if (!wx.cloud) {
    console.error('初始化失败')
  } else {
    wx.cloud.init({
      env: import.meta.env.VITE_WEIXIN_CLOUD_ENV,
      traceUser: true
    })
  }

  systemStore.getToggles()
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
