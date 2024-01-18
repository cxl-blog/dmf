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

// #ifdef MP-WEIXIN
import WXBizDataCrypt from '@/utils/weixin-biz-data-crypt'

// #endif

const page = usePage()
const { t } = useI18n()
const { pages, pageLoading } = storeToRefs(useAppStore())
const { mode } = storeToRefs(useDivinationStore())
const { isLogin } = storeToRefs(useUserStore())
const statusBarHeight = ref(44)
const navbarHeight = ref(44)

// #ifdef MP-WEIXIN
const { checkSession, login, getUserProfile } = useWeixin()
// #endif

const statusHPx = computed(() => {
  return `${unref(statusBarHeight)}px`
})
const titleHPx = computed(() => {
  return `${unref(navbarHeight)}px`
})

const pageConfig = computed<Partial<PageConfig>>(() => {
  return unref(pages).find(item => item.path === unref(page).route) ?? {}
})

const title = computed(() => {
  const name =
    unref(pageConfig)?.navbarTitle ??
    (unref(pageConfig)?.style?.navigationBarTitleText || '命运大师')

  return pageConfig.value.path === 'pages/category/index' ? t(unref(mode)) : t(name)
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
  await initLoginOfdWeixin()
  await getUserProfileOfWeixin()
  // #endif
})

onLoad(() => {
  // #ifdef MP-WEIXIN
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight as number
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  navbarHeight.value = (menuButtonInfo.top - unref(statusBarHeight)) * 2 + menuButtonInfo.height
  // #endif
})

// #ifdef MP-WEIXIN
async function initLoginOfdWeixin() {
  const logined = await checkSession()

  if (!logined) {
    await login()
      .then(() => {
        isLogin.value = true
      })
      .catch(res => {
        uni.showToast({
          icon: 'error',
          title: res.errMsg
        })
      })
  } else {
    isLogin.value = true
  }
}

async function getUserProfileOfWeixin() {
  if (isLogin.value) {
    wx.showModal({
      title: t('温馨提示'),
      content: t('授权微信获取用户信息后，才能正常使用小程序功能'),
      async success(res) {
        if (res.confirm) {
          // const { iv, encryptedData } = await getUserProfile()
          const res = await getUserProfile()
          const appId = 'wx4f4bc4dec97d474b'
          const sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
          const encryptedData =
            'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM' +
            'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS' +
            '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+' +
            '3hVbJSRgv+4lGOETKUQz6OYStslQ142d' +
            'NCuabNPGBzlooOmB231qMM85d2/fV6Ch' +
            'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6' +
            '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw' +
            'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn' +
            '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs' +
            '8LOddcQhULW4ucetDf96JcR3g0gfRK4P' +
            'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB' +
            '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns' +
            '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd' +
            'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV' +
            'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG' +
            '20f0a04COwfneQAGGwd5oa+T8yO5hzuy' +
            'Db/XcxxmK01EpqOyuxINew=='
          const iv = 'r7BXXKkLb8qrSNn05n0qiA=='
          const pc = new WXBizDataCrypt(appId, sessionKey)
          const data = pc.decryptData(encryptedData, iv)
          console.log({ res, data })
        }
      }
    })
  }
}
// #endif
</script>

<template>
  <view class="app-layout h-100% bg-[#f7f5f1]">
    <!-- 状态栏 -->
    <up-navbar
      class="app-navbar"
      :title="title"
      :auto-back="autoBack"
      :leftIcon="autoBack ? 'arrow-left' : ''"
      bgColor="#f7f5f1"
      placeholder
      :border="showBorder"
      :height="`${navbarHeight}px`"
    />
    <view class="app-main flex flex-col">
      <view class="app-main__content min-h-0 flex-1">
        <slot></slot>
      </view>
      <PageTooltip />
    </view>
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
          <text>{{ t('卜算子') }}</text>
        </view>
      </view>
    </u-loading-page>
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
  height: calc(100% - var(--status-bar-height));
  // #ifdef MP-WEIXIN
  height: calc(100vh - v-bind(statusHPx) - v-bind(titleHPx));
  // #endif
  position: relative;
  background-color: $u-bg-color;
}

.page-loading {
  background-color: rgba(17, 14, 12, 0.7);
  :deep() .u-loading-page__warpper__loading-icon {
    display: none;
  }
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
