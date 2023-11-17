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
  </view>
</template>

<style scoped lang="scss">
.app-navbar {
  height: var(--status-bar-height);
  width: 100%;
}

.app-main {
  height: calc(100svh - var(--status-bar-height));
  position: relative;
}
</style>
