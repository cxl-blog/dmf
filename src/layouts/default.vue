// #ifdef MP-WEIXIN
<script lang="ts">
// 微信小程序 样式穿透
export default {
  options: { styleIsolation: 'shared' }
}
</script>
// #endif

<script setup lang="ts">
import { usePage } from '@uni-helper/uni-use'
import PageTooltip from '@/components/page-tooltip/index.vue'
import ShareButton from '@/components/share/ShareButton.vue'

// import WXBizDataCrypt from '@/utils/weixin-biz-data-crypt'

const page = usePage()
const { t } = useI18n()
const appStore = useAppStore()
const { pages, pageLoading, layout } = storeToRefs(appStore)
const { mode } = storeToRefs(useDivinationStore())
const { sharable } = storeToRefs(useSystemStore())
// const { isLogin } = storeToRefs(useUserStore())
const statusBarHeight = ref(44)
const navbarHeight = ref(44)
const tabRef = ref<any>(null)
const tabList = ref([
  { name: t('首页'), path: 'pages/index/index', icon: 'home' },
  // { name: t('卦象百科'), path: 'pages/divinatory-symbol/List', icon: 'coupon' },
  { name: t('日历'), path: 'pages/calendar/index', icon: 'coupon' },

  { name: t('历史记录'), path: 'pages/history/index', icon: 'list' },
  { name: t('设置'), path: 'pages/setting/index', icon: 'setting' }
])

const tab = computed(() => {
  const index = tabList.value.findIndex(item => item.path === pageConfig.value.activeTabPath)

  return index
})

// #ifdef MP-WEIXIN
// const { checkSession, login, getUserProfile } = useWeixin()
// #endif

const tabHeight = computed(() => {
  return unref(tabRef)?.placeholderHeight ? `${unref(tabRef)?.placeholderHeight}px` : '51px'
})

const appMainH = computed(() => {
  if (unref(navbarDisabled)) {
    let h = `calc(100vh - ${unref(tabHeight)})`
    // #ifdef MP-WEIXIN
    h = `calc(100vh - ${unref(tabHeight)})`
    // #endif

    return h
  } else if (pageConfig.value.tabbarDisabled) {
    let h = `calc(100vh - ${unref(statusBarHeight)}px)`
    // #ifdef MP-WEIXIN
    h = `calc(100vh - ${unref(statusBarHeight)}px - ${unref(navbarHeight)}px)`
    // #endif

    return h
  } else {
    let h = `calc(100vh - ${unref(statusBarHeight)}px - ${unref(tabHeight)})`
    // #ifdef MP-WEIXIN
    h = `calc(100vh - ${unref(statusBarHeight)}px - ${unref(navbarHeight)}px - ${unref(tabHeight)})`
    // #endif
    return h
  }
})

const pageConfig = computed<Partial<PageConfig>>(() => {
  return unref(pages).find(item => item.path === unref(page).route) ?? {}
})

const title = computed(() => {
  const name = unref(pageConfig)?.style?.navigationBarTitleText || '神卜谷'

  return pageConfig.value.path === 'pages/category/index' ? t(unref(mode)) : t(name)
})

const navbarDisabled = computed(() => {
  return unref(pageConfig).navbarDisabled ?? false
})

const autoBack = computed(() => {
  return !unref(pageConfig).navbarDisableAutoBack
})
const showBorder = computed(() => {
  let flag = false
  // #ifdef MP-WEIXIN
  flag = true
  // #endif

  return flag
})

onReady(async () => {
  // #ifdef MP-WEIXIN
  // await initLoginOfdWeixin()
  // await getUserProfileOfWeixin()
  // #endif
})

onLoad(() => {
  // #ifdef MP-WEIXIN
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight as number
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  navbarHeight.value = (menuButtonInfo.top - unref(statusBarHeight)) * 2 + menuButtonInfo.height
  layout.value = Object.assign(layout.value, {
    navbarHeight: navbarHeight.value,
    statusHeight: statusBarHeight.value
  })
  // #endif
})

onReady(() => {
  // #ifdef MP-WEIXIN
  wx.showShareMenu({
    withShareTicket: true,
    // 设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
    menus: ['shareAppMessage', 'shareTimeline']
  })
  // #endif
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

function handleTabChange(val) {
  const item = tabList.value[val]
  try {
    uni.reLaunch({
      url: `/${item.path}`,
      animationType: 'slide-in-right',
      animationDuration: 300
    })
  } catch (error) {}
}

function handleLeftClick() {
  if (unref(pageConfig).path === 'pages/chat/index') {
    uni.navigateTo({ url: '/pages/index/index' })
  }

  return false
}
// #ifdef MP-WEIXIN
// async function initLoginOfdWeixin() {
//   const logined = await checkSession()

//   if (!logined) {
//     await login()
//       .then(() => {
//         isLogin.value = true
//       })
//       .catch(res => {
//         uni.showToast({
//           icon: 'error',
//           title: res.errMsg
//         })
//       })
//   } else {
//     isLogin.value = true
//   }
// }

// async function getUserProfileOfWeixin() {
//   if (isLogin.value) {
//     wx.showModal({
//       title: t('温馨提示'),
//       content: t('授权微信获取用户信息后，才能正常使用小程序功能'),
//       async success(res) {
//         if (res.confirm) {
//           // const { iv, encryptedData } = await getUserProfile()
//           const res = await getUserProfile()
//           const appId = 'wx4f4bc4dec97d474b'
//           const sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
//           const encryptedData =
//             'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM' +
//             'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS' +
//             '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+' +
//             '3hVbJSRgv+4lGOETKUQz6OYStslQ142d' +
//             'NCuabNPGBzlooOmB231qMM85d2/fV6Ch' +
//             'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6' +
//             '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw' +
//             'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn' +
//             '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs' +
//             '8LOddcQhULW4ucetDf96JcR3g0gfRK4P' +
//             'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB' +
//             '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns' +
//             '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd' +
//             'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV' +
//             'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG' +
//             '20f0a04COwfneQAGGwd5oa+T8yO5hzuy' +
//             'Db/XcxxmK01EpqOyuxINew=='
//           const iv = 'r7BXXKkLb8qrSNn05n0qiA=='
//           const pc = new WXBizDataCrypt(appId, sessionKey)
//           const data = pc.decryptData(encryptedData, iv)
//           console.log({ res, data })
//         }
//       }
//     })
//   }
// }
// #endif
</script>

<template>
  <view class="app-layout h-100% bg-[#f7f5f1]">
    <!-- 状态栏 -->
    <up-navbar
      v-if="!navbarDisabled"
      class="app-navbar"
      :title="title"
      :auto-back="autoBack"
      :leftIcon="autoBack ? 'arrow-left' : ''"
      bgColor="#f7f5f1"
      placeholder
      :border="showBorder"
      :height="`${navbarHeight}px`"
      @leftClick="handleLeftClick"
    />
    <view class="app-main flex flex-col" :class="{ 'bottom-bar': pageConfig.tabbarDisabled }">
      <view class="app-main__content min-h-0 flex-1">
        <slot></slot>
      </view>
      <PageTooltip v-if="!pageConfig.pageTooltipDisabled" />
    </view>
    <u-tabbar
      v-if="!pageConfig.tabbarDisabled"
      ref="tabRef"
      :value="tab"
      :fixed="true"
      class="min-h-0 flex-1!"
      :placeholder="true"
      activeColor="#b97d2d"
      :safeAreaInsetBottom="true"
      @change="handleTabChange"
    >
      <u-tabbar-item
        v-for="item in tabList"
        :key="item.name"
        :class="{ 'chat-item': item.path === 'pages/chat/index' }"
        :text="item.name"
        :icon="item.icon"
      />
    </u-tabbar>

    <u-loading-page
      class="page-loading"
      bg-color="rgba(17,14,12,0.70);"
      :loading="pageLoading"
      image=""
      :icon-size="0"
      loading-mode="spinner"
      loadingColor="transparent"
    >
      <view class="loading-content">
        <view class="loading-logo">
          <view class="loading-logo-center" />
        </view>
        <view class="loading-text">
          <text>{{ t('神卜谷') }}</text>
        </view>
      </view>
    </u-loading-page>

    <ShareButton v-if="sharable" />
  </view>
</template>

<style scoped lang="scss">
.app-layout {
  :deep() .u-navbar__content__title {
    font-size: 18px;
    font-weight: 600;
  }
}
.app-navbar {
  height: var(--status-bar-height);
  width: 100%;
  background-color: $u-bg-color !important;
  box-shadow: 0px 1px 0px 0px rgba(234, 226, 210, 0.8);
  border: 1px solid rgba(234, 226, 210, 0.8);
}

.app-main {
  height: v-bind(appMainH);
  position: relative;
  background-color: $u-bg-color;
}

.page-loading {
  position: relative;
  z-index: 2000;
  background-color: rgba(17, 14, 12, 0.7);
  :deep() .u-loading-page__warpper__loading-icon {
    display: none;
  }
}

.bottom-bar {
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: border-box;
  background-color: #fff;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-logo {
  $color: #b4a38c;

  padding: 8px;
  background-color: transparent;
  border: 2px solid $color;
  border-radius: 50%;
  position: relative;
  animation: logo-animate 2s linear infinite forwards;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #b4a38c;
    border-radius: 4px;
    position: absolute;
    bottom: -5px;
    left: calc(50% - 4px);
  }

  &-center {
    width: 72px;
    height: 72px;
    background-color: $color;
    border-radius: 50%;
  }
}

.loading-text {
  margin-top: 8px;
  font-size: 16px;
  color: #fff;
  font-weight: 400;
}

@keyframes logo-animate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
