<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components'
import { trigrams } from '@/api/divination'
import SymbolImg from '@/components/divination-symbol/index.vue'
import type { DivinationDetail } from '@/config/divination'
import { DIVINATION_SYMBOL } from '@/constants/divination'

type Data = DivinationDetail & { showed: boolean }

const list = ref<Data[]>([])
const appStore = useAppStore()
const rootRef = ref()
appStore.startLoading()
onBeforeMount(() => {
  getList()
})

function getList() {
  trigrams()
    .then(res => {
      console.log({ res })
      list.value = res.trigrams
    })
    .finally(() => {
      nextTick(appStore.endLoading)
    })
}

function onIntersectionObserver([{ isIntersecting }]: IntersectionObserverEntry[], item: Data) {
  if (isIntersecting) {
    item.showed = true
  }
}
</script>

<template>
  <scroll-view ref="rootRef" scroll-y class="box-border h-100% p-[0_16px_0_16px]">
    <view class="pt-16px container">
      <template v-for="item in list" :key="item.key">
        <view
          v-intersection-observer="data => onIntersectionObserver(data, item)"
          class="symbol-item relative b-[1px_solid_#ccc] b-rd-10px bg-[#ffffff] py-16px"
          :class="{ showed: item.showed }"
        >
          <view class="item-name">
            <text>{{ item.name }}</text>
          </view>
          <view class="flex items-center justify-center">
            <SymbolImg
              class="w-80% opacity-50"
              inactive-bg-color="#ffffff"
              :symbol-name="DIVINATION_SYMBOL[item.id].key"
              :offsetItemY="8"
              active-bg-color="#dbbd95"
            />
          </view>
          <!-- <view>
            <text>{{ item.name }}</text>
          </view> -->
          <view class="px-16px pt-16px">
            <text>{{ item.symbol }}</text>
          </view>
        </view>
      </template>
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
.container {
  // display: grid;
  /*  声明列的宽度  */
  // grid-template-columns: repeat(2, auto);
  // grid-gap: 20px;
  // display: flex;
  // flex-wrap: row;
  // width: 100%;
  width: 100%; // 默认宽度
  // margin: 20px auto; // 剧中
  columns: 2; // 默认列数
  column-gap: 16px; // 列间距
}
.symbol-item {
  width: 100%;
  break-inside: avoid;
  flex: 0 0 50%;
  margin-bottom: 20px;
  box-shadow: 0 0 2px 3px #eee;
  position: relative;

  opacity: 0;
  top: 40px;
  position: relative;

  &:nth-child(odd) {
    right: 40px;
  }
  &:nth-child(even) {
    left: 40px;
  }

  &.showed {
    transition: 0.4s all ease;
    opacity: 1;
    top: 0;
    &:nth-child(odd) {
      right: 0;
    }
    &:nth-child(even) {
      left: 0;
    }
  }
}

.item-name {
  position: absolute;
  font-size: 36px;
  top: 60px;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 50%;
  border: 2px solid #dbbd95;
  height: 80px;
  box-sizing: border-box;
  width: 80px;
  line-height: 80px;
  text-align: center;
  color: #b2a7a7;
}
</style>
