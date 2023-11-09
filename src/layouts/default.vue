<script setup lang="ts">
import { usePage } from '@uni-helper/uni-use'
import { useCssVar } from '@vueuse/core'

const page = usePage()
const { t } = useI18n()
const { pages } = storeToRefs(useAppStore())

const title = computed(() => {
  const route = unref(pages).find(item => item.path === unref(page).route)
  const name = route?.title || route?.style?.navigationBarTitleText || '算子'

  return t(name)
})
const navbarH = useCssVar('--status-bar-height')
</script>

<template>
  <view>
    <up-navbar class="app-navbar" :title="title" auto-back placeholder :height="navbarH" />
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
