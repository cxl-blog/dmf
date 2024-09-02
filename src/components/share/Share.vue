// #ifdef MP-WEIXIN
<script lang="ts">
// 微信小程序 样式穿透
export default {
  options: { styleIsolation: 'shared' }
}
</script>
// #endif

<script setup lang="ts">
import dayjs from 'dayjs'
import { dayTrigrams } from '@/api/divination'
import type { DivinationDetail } from '@/config/divination'
import code from '@/static/imgs/share/code.png'
import lineSrc from '@/static/imgs/line-short.png'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', data: boolean): void
}>()

const { t } = useI18n()
const detail = reactive<Partial<DivinationDetail>>({})

const show = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

onMounted(() => {
  dayTrigrams().then(res => {
    console.log({ res })
    Object.assign(detail, res)
  })
})
</script>

<template>
  <up-popup
    :show="show"
    mode="center"
    closeable
    :round="20"
    customStyle="width: 80vw;"
    @close="show = false"
  >
    <view class="h-60vh">
      <view class="relative box-border h-100% flex flex-col items-center justify-center p-20px">
        <view class="mt-10px flex items-center justify-center text-center text-14px">
          <img :src="lineSrc" class="h-6px w-25vw rotate-180" alt="line" />
          <view class="shrink-0 px-12px text-16px font-bold">{{ t('今日运势') }}</view>
          <img :src="lineSrc" class="h-6px w-25vw" alt="line" />
        </view>

        <scroll-view scroll-y class="min-h-0 flex-1 py-20px">
          <!-- <view class="mb-10px text-16px">{{ detail.hexagramRecordExplanation }}</view> -->
          <view class="indent-32px">{{ detail.generalExplanation }}</view>
        </scroll-view>

        <view class="box-border w-100% flex items-center justify-between px-20px">
          <view>
            <view class="text-24px">{{ dayjs().format('DD') }}</view>
            <view>{{ dayjs().format('YYYY年MM月') }}</view>
          </view>
          <img :src="code" class="h-100px w-100px" />
        </view>
        <view class="w-100% flex justify-center">
          <view class="share-btn mt-16px w-60%">
            <up-button type="primary" icon="share" shape="circle" text="截图分享" />
          </view>
        </view>
      </view>
    </view>
  </up-popup>
</template>

<style scoped lang="scss">
.share-btn {
  // animation: bounce-top 1.2s linear 0.5s infinite normal none;
}

@keyframes bounce-top {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-24px);
  }
  55% {
    transform: translateY(0);
  }
  65% {
    transform: translateY(-12px);
  }
  75% {
    transform: translateY(0);
  }
  82% {
    transform: translateY(-6px);
  }
  87% {
    transform: translateY(0);
  }
  93% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
