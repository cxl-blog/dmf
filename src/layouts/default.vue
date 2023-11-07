<script setup lang="ts">
import { usePage } from '@uni-helper/uni-use'

const page = usePage()
const { t } = useI18n()
const { pages } = storeToRefs(useAppStore())

const title = computed(() => {
  const route = unref(pages).find(item => item.path === unref(page).route)
  const name = route?.title || route?.style?.navigationBarTitleText || '算子'

  return t(name)
})
</script>

<template>
  <view>
    <up-navbar class="h-44px" :title="title" auto-back />
    <slot></slot>
  </view>
</template>

<style scoped></style>
