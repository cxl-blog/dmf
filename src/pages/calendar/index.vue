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
import { DIVINATION_SYMBOL } from '@/constants/divination'
import DetailPopup from '@/components/divination-symbol/DetailPopup.vue'

const appStore = useAppStore()
const { getData } = useHistory()
const historyList = ref<DivinationDetail[]>(getData().reverse())
const list = ref<DivinationDetail[]>(
  unref(historyList).filter(item => {
    return dayjs(item.time).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')
  }) || []
)
appStore.startLoading()
const lunar = Lunar.fromDate(new Date())
const { t } = useI18n()
const calendarRef = ref()
const maxDate = dayjs().add(1, 'day').format('YYYY-MM-DD')
const detail = reactive<Partial<DivinationDetail>>({})
const showPopup = ref(false)

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
  } else if (dayjs(day.date).format('YYYY-MM-DD') !== dayjs().format('YYYY-MM-DD')) {
    day.disabled = true
  } else {
    day.bottomInfo += '/今日'
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

const isClick = ref(false)
function handleShowDetail(item: DivinationDetail) {
  Object.assign(detail, item)
  isClick.value = true
  showPopup.value = true
  const timer = setTimeout(() => {
    isClick.value = false
    clearTimeout(timer)
  }, 200)
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
    <view class="my-20px px-16px">
      <view v-if="!list.length" class="date-card">
        <view class="mb-10px flex text-12px">
          <u-tag :text="t('宜')" type="success" size="mini" />
          <text class="ml-10px text-14px">{{ lunar.getDayYi().toString() }}</text>
        </view>
        <view class="flex text-12px">
          <u-tag :text="t('忌')" type="error" size="mini" />
          <text class="ml-10px text-14px">{{ lunar.getDayJi().toString() }}</text>
        </view>

        <view class="mt-24px flex flex-col items-center text-center">
          <view class="btn-container w-100%">
            <up-button
              :text="t('卜一卦')"
              shape="circle"
              :customStyle="{
                border: '1px solid #dfb986',
                background: '#fff'
              }"
              @click="handleJumpShake"
            />
          </view>

          <view class="mt-10px">
            <text class="text-center text-12px color-white">{{ t('今日还没有摇卦哦') }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="px-16px">
      <template v-for="item in list" :key="item.id">
        <view
          class="item-container border-bottom relative z-2 px-16px py-10px"
          :class="{
            active: isClick && detail.id === item.id
          }"
          @click="handleShowDetail(item)"
        >
          <view class="mb-10px flex items-center justify-between">
            <u-tag :text="item.category" plain size="mini" type="warning" />
            <view class="text-12px color-gray">{{
              dayjs(item.time).format('YYYY-MM-DD HH:mm')
            }}</view>
          </view>
          <view>
            <text class="text-16px font-bold">{{ item.name }}/{{ item.alias }}</text>
          </view>
          <view>
            <text class="inline-block pr-65px text-12px color-gray">
              {{ item.symbol }}
            </text>
          </view>
          <SymbolImg
            :symbol-name="DIVINATION_SYMBOL[item.id!]?.key"
            inactiveBgColor="#ffffff"
            :offsetItemY="4"
            active-bg-color="rgba(0,0,0,0.15)"
            class="symbol-item"
          />
        </view>
      </template>
    </view>
  </scroll-view>
  <DetailPopup v-model="showPopup" :detail="detail as DivinationDetail" />
</template>

<style scoped lang="scss">
.date-card {
  background-color: #d1d3d6;
  color: #fff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
}

.item-container {
  background-color: #ffffff;
  border-radius: 8px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &.active {
    background-color: #ebe1d5;
  }
}

.btn-container {
  position: relative;
  border-radius: 100px;
  overflow: hidden;
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, hsla(34.5, 100%, 41%, 0.5), transparent);
    transform: translateX(-100%);
    z-index: 1;
    //transition: 0.6s;
    animation: 2s both btn-active-move infinite 0.3s;
  }
}

@keyframes btn-active-move {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}
</style>
