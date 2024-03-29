<script setup lang="ts">
import { trigrams } from '@/api/divination'
import SymbolImg from '@/components/divination-symbol/index.vue'
import type { DivinationDetail } from '@/config/divination'
import { DIVINATION_SYMBOL } from '@/constants/divination'

const list = ref<DivinationDetail[]>([])
const appStore = useAppStore()
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
</script>

<template>
  <scroll-view scroll-y class="box-border h-100% p-[0_16px_0_16px]">
    <view class="pt-16px container">
      <template v-for="item in list" :key="item.key">
        <view class="symbol-item relative b-[1px_solid_#ccc] b-rd-10px bg-[#ffffff] py-16px">
          <view class="item-name">
            <text>{{ item.name }}</text>
          </view>
          <view class="flex items-center justify-center">
            <SymbolImg
              class="w-80% opacity-50"
              inactive-bg-color="#ffffff"
              :symbol-name="DIVINATION_SYMBOL[item.id].key"
              :offsetItemY="8"
              active-bg-color="rgba(0,0,0,0.15)"
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
}

.item-name {
  position: absolute;
  font-size: 36px;
  top: 60px;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 50%;
  border: 1px solid #745224;
  height: 80px;
  box-sizing: border-box;
  width: 80px;
  line-height: 80px;
  text-align: center;
}
</style>
