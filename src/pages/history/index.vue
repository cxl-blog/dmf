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
import { vIntersectionObserver } from '@vueuse/components'
import SymbolImg from '@/components/divination-symbol/index.vue'
import type { DivinationDetail } from '@/config/divination'
import { DIVINATION_SYMBOL } from '@/constants/divination'
import DetailPopup from '@/components/divination-symbol/DetailPopup.vue'

type Data = DivinationDetail & { showed: boolean }

const data = ref<Data[]>([])

const { getData } = useHistory()
const { t } = useI18n()
const init = ref(false)
const showPopup = ref(false)
const detail = reactive<Partial<Data>>({})
const appStore = useAppStore()
const rootRef = ref()
appStore.startLoading()

const isClick = ref(false)

onBeforeMount(() => {
  data.value = getData().reverse() as Data[]
  init.value = true
  nextTick(() => {
    appStore.endLoading()
  })
})

function handleShowDetail(item: Data) {
  Object.assign(detail, item)
  isClick.value = true
  showPopup.value = true
  const timer = setTimeout(() => {
    isClick.value = false
    clearTimeout(timer)
  }, 200)
}

function onIntersectionObserver([{ isIntersecting }]: IntersectionObserverEntry[], item: Data) {
  if (isIntersecting) {
    item.showed = true
  }
}
</script>

<template>
  <view class="relative h-100% flex flex-col">
    <scroll-view ref="rootRef" scroll-y class="h-100%!">
      <view v-if="init" class="list-content p-16px">
        <template v-if="data.length">
          <template v-for="item in data" :key="item.id">
            <view
              v-intersection-observer="data => onIntersectionObserver(data, item)"
              class="item-container border-bottom relative z-2 px-16px py-10px"
              :class="{
                active: isClick && detail.id === item.id,
                showed: item.showed
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
        </template>
        <u-empty v-else />
      </view>
      <view v-else class="mt-20px">
        <u-loading-icon :text="t('获取数据中...')" textSize="14" />
      </view>
    </scroll-view>

    <DetailPopup v-model="showPopup" :detail="detail as DivinationDetail" />
  </view>
</template>

<style scoped lang="scss">
.item-container {
  background-color: #ffffff;
  border-radius: 8px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &.active {
    background-color: #ebe1d5;
  }

  transform: scale(1.08) translateY(40px);
  opacity: 0;

  &.showed {
    transition: 0.4s all ease;
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.symbol-item {
  position: absolute;
  top: 40%;
  right: 20px;
  width: 50px;
  opacity: 0.5;
  pointer-events: none;
  z-index: 1;
}
</style>
