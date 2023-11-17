<script setup lang="ts">
import { usePage } from '@uni-helper/uni-use'
import { useCssVar } from '@vueuse/core'

const page = usePage()
const { t } = useI18n()
const { pages } = storeToRefs(useAppStore())
console.log({ page })

const pageConfig = computed<Partial<PageConfig>>(() => {
  return unref(pages).find(item => item.path === unref(page).route) ?? {}
})

const title = computed(() => {
  const name =
    unref(pageConfig)?.navbarTitle ?? (unref(pageConfig)?.style?.navigationBarTitleText || '算子')

  return t(name)
})
const navbarH = useCssVar('--status-bar-height')
const autoBack = computed(() => {
  return !unref(pageConfig).navbarDisableAutoBack
})
const pageLoading = ref(false)
</script>

<template>
  <view>
    <up-navbar
      class="app-navbar"
      :title="title"
      :auto-back="autoBack"
      :leftIcon="autoBack ? 'arrow-left' : ''"
      placeholder
      :height="navbarH"
    />
    <view class="app-main">
      <slot></slot>
    </view>
    <up-loading-page v-show="pageLoading" loading-mode="spinner" class="page-loading">
      212121
    </up-loading-page>
  </view>
</template>

<style scoped lang="scss">
.app-navbar {
  height: var(--status-bar-height);
  width: 100%;

  :deep() .u-navbar__content {
    background-color: $u-bg-color !important;
    box-shadow: 0px 1px 0px 0px rgba(234, 226, 210, 0.8);
  }

  :deep() .u-navbar__content__title {
    font-size: 18px;
    font-weight: 600;
  }
}

.app-main {
  height: calc(100svh - var(--status-bar-height));
  position: relative;
}
</style>
