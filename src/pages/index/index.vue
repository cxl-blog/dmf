<script setup lang="ts">
import { customerTrigrams } from '@/api/divination'

const { mode } = storeToRefs(useDivinationStore())
const { t } = useI18n()
const divinationDetail = reactive({
  id: '',
  trigramsId: ''
})

function jumpTo() {
  uni.navigateTo({ url: '/pages/category/index' })
}

function handleShowDetail() {
  uni.navigateTo({
    url: `/pages/divinatory-symbol/Detail?trigramsId=${divinationDetail.trigramsId}`
  })
}

// function handleJumpList() {
//   uni.navigateTo({ url: '/pages/divinatory-symbol/List' })
// }

function start() {
  customerTrigrams().then(res => {
    Object.assign(divinationDetail, res)
  })
}
</script>

<template>
  <view class="content box-border w-100% p-20px">
    <view class="header w-100% flex justify-between">
      <view class="header-left color-gray">
        <text>{{ mode }}</text>
      </view>
      <view class="header-right">
        <up-text suffixIcon="arrow-right" :text="t('查看更多')" @click="jumpTo" />
      </view>
    </view>
    <view class="content-center" />
    <view class="content-footer w-100% flex justify-between">
      <view class="flex flex-1 flex-col items-center" @click="start">
        <up-icon name="play-circle" size="80" />
        <text class="block">{{ !divinationDetail.trigramsId ? t('启卦') : t('重新摇卦') }}</text>
      </view>
      <view
        v-show="divinationDetail.trigramsId"
        class="flex flex-1 flex-col items-center"
        @click="handleShowDetail"
      >
        <up-icon name="more-circle" size="80" />
        <text class="block">{{ t('查看卦象') }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.content-center {
  border-radius: 50%;
  box-shadow: 0 0 15px 10px #ece5dd;
  height: 70vw;
  width: 70vw;
  margin: 50px 0;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin-top: 200rpx;
  margin-right: auto;
  margin-bottom: 50rpx;
  margin-left: auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
