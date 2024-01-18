<script setup lang="ts">
onLaunch(() => {
  if (!wx.cloud) {
    console.error('初始化失败')
  } else {
    wx.cloud.init({
      env: 'prod-8ge16jg5afdf6cc6',
      traceUser: true
    })
  }
})
onShow(() => {
  console.log('App Show')
})
onReady(() => {
  console.log('App Ready')
})

onLoad(options => {
  console.log({ options }, 'app loaded')
})
onHide(() => {
  console.log('App Hide')
})

onBeforeMount(() => {
  console.log('vue before mounded')
})
</script>

<style lang="scss">
body {
  background-color: $u-bg-color;
  height: 100vh !important;
}
</style>
