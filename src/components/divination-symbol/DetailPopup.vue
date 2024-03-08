// #ifdef MP-WEIXIN
<script lang="ts">
// 微信小程序 样式穿透
export default {
  options: { styleIsolation: 'shared' }
}
</script>
// #endif

<script setup lang="ts">
import type { DivinationDetail } from '@/config/divination'
import Detail from '@/components/divination-symbol/Detail.vue'

const props = defineProps<{
  modelValue: boolean
  detail: DivinationDetail
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', data: boolean): void
}>()

const localShow = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>

<template>
  <u-popup
    :show="localShow"
    :round="10"
    mode="bottom"
    closeable
    :customStyle="{
      background: '#f7f5f1'
    }"
    @close="localShow = false"
  >
    <Detail :show-page-tooltip="true" :detail="detail" class="box-border h-75vh pt-44px" />
  </u-popup>
</template>

<style scoped></style>
