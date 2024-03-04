// #ifdef MP-WEIXIN
<script lang="ts">
// 微信小程序 样式穿透
export default {
  options: { styleIsolation: 'shared' }
}
</script>
// #endif

<script setup lang="ts">
onLaunch(() => {
  console.log('App Launch')
  if (!wx.cloud) {
    console.error('初始化失败')
  } else {
    wx.cloud.init({
      env: 'prod-8ge16jg5afdf6cc6',
      traceUser: true
    })
  }

  // #ifdef MP-WEIXIN
  wx.showShareMenu({
    withShareTicket: true,
    // 设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
    menus: ['shareAppMessage', 'shareTimeline']
  })
  // #endif
})
onShow(() => {
  console.log('App Show')
  // #ifdef MP-WEIXIN
  // fix二次不能分享
  wx.showShareMenu({
    withShareTicket: true,
    // 设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
    menus: ['shareAppMessage', 'shareTimeline']
  })
  // #endif
})
onReady(() => {
  console.log('App Ready')
})

onHide(() => {
  console.log('App Hide')
})

onBeforeMount(() => {
  console.log('vue before mounded')
})

// #ifdef MP-WEIXIN
onShareAppMessage(() => {
  return {
    title: '神卜谷', // 分享的名称
    path: '/pages/index/index',
    mpId: 'wx3bb12404cf91f8f4' // 此处配置微信小程序的AppId
  }
})

onShareTimeline(() => {
  return {
    title: '神卜谷-弘扬国学易经，相信科学，仅供学习参考',
    type: 0,
    summary: ''
  }
})
// #endif
</script>

<style lang="scss">
body {
  background-color: $u-bg-color;
  height: 100vh !important;
}
</style>
