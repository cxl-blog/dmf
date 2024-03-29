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
import { Lunar } from 'lunar-typescript'
import CustomCalendar from '@/components/custom-calendar/index.vue'
import type { DivinationDetail } from '@/config/divination'

const appStore = useAppStore()
const { getData } = useHistory()
const historyList = ref<DivinationDetail[]>(getData().reverse())
const list = ref<DivinationDetail[]>([])
appStore.startLoading()
const lunar = Lunar.fromDate(new Date())
const { t } = useI18n()
const calendarRef = ref()

const maxDate = dayjs().add(1, 'day').format('YYYY-MM-DD')

onMounted(() => {
  appStore.endLoading()
})

onReady(() => {
  // 如果需要兼容微信小程序的话，需要用此写法
  unref(calendarRef).setFormatter(formatter)
})

function handleJumpShake() {
  uni.navigateTo({
    url: `/pages/index/index?autoStart=true`,
    animationType: 'slide-in-right',
    animationDuration: 300
  })
}

function formatter(day: { bottomInfo: string; dot: boolean; disabled: boolean; date: string }) {
  const localDate = dayjs(day.date).format('YYYY-MM-DD')
  const target = unref(historyList).find(item => {
    return dayjs(item.time).format('YYYY-MM-DD') === localDate
  })

  if (target) {
    day.dot = true
    day.disabled = false
    day.bottomInfo += '/卜'
  }

  return day
}

function handleConfirm(data) {
  const date = data[0]
  list.value =
    unref(historyList).filter(item => {
      return dayjs(item.time).format('YYYY-MM-DD') === date
    }) || []
}
</script>

<template>
  <scroll-view class="h-100%!" scroll-y>
    <view class="mt-10px text-center">
      <text class="letter-spacing-[22px] mb-10px text-18px font-bold">
        {{ lunar.getYearInGanZhiByLiChun() }}({{ lunar.getYearShengXiao() }}){{ t('年') }}
      </text>
      <view class="mt-5px">
        <text class="text-12px color-gray">{{ dayjs().format('YYYY-MM-DD') }}</text>
      </view>
    </view>
    <view class="">
      <CustomCalendar
        ref="calendarRef"
        showLunar
        :round="6"
        :row-height="56"
        :monthNum="1"
        :showConfirm="false"
        :formatter="formatter"
        color="#dfb986"
        :maxDate="maxDate"
        @confirm="handleConfirm"
      />
    </view>
    <view class="mt-20px px-16px">
      <view class="date-card">
        <view class="mb-10px flex text-12px">
          <u-tag :text="t('宜')" type="success" size="mini" />
          <text class="ml-10px text-14px">{{ lunar.getDayYi().toString() }}</text>
        </view>
        <view class="flex text-12px">
          <u-tag :text="t('忌')" type="error" size="mini" />
          <text class="ml-10px text-14px">{{ lunar.getDayJi().toString() }}</text>
        </view>

        <view class="mt-24px flex flex-col items-center text-center">
          <view class="w-100%">
            <up-button
              :text="t('卜一卦')"
              shape="circle"
              :customStyle="{ border: '1px solid #dfb986' }"
              color="linear-gradient(140deg, #dfb986, #ffe59c63)"
              @click="handleJumpShake"
            />
          </view>

          <view class="mt-10px">
            <text class="text-center text-12px color-white">{{ t('今日还没有摇卦哦') }}</text>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
.date-card {
  background-color: #d1d3d6;
  color: #fff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
}
</style>
