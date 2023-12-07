<script setup lang="ts">
import { nextTick } from 'vue'
import { customerTrigrams } from '@/api/divination'
import imgSrc from '~@/static/imgs/logo1x.png'

const { mode } = storeToRefs(useDivinationStore())
const { t } = useI18n()
const divinationDetail = reactive({
  id: '',
  trigramsId: ''
})
const startLoading = ref(false)

function jumpTo() {
  uni.navigateTo({ url: '/pages/category/index' })
}

function handleShowDetail() {
  uni.navigateTo({
    url: `/pages/divinatory-symbol/Detail?trigramsId=${divinationDetail.trigramsId}`,
    animationType: 'slide-in-right',
    animationDuration: 300
  })
}

async function start() {
  if (startLoading.value) {
    return
  }

  startLoading.value = true
  const timer = setTimeout(async () => {
    const res = await customerTrigrams()
    Object.assign(divinationDetail, res)
    nextTick(() => {
      startLoading.value = false
    })
    clearTimeout(timer)
  }, 2000)
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
    <view class="content-center" :class="{ 'logo-start-animate': startLoading }">
      <image :src="imgSrc" class="content-center-1" mode="scaleToFill" />
      <!-- <image :src="img2" class="content-center-2" mode="scaleToFill" /> -->
      <!-- <image :src="img3" class="content-center-3" mode="scaleToFill" /> -->
    </view>
    <view class="content-footer w-100% flex justify-between">
      <view class="flex flex-1 flex-col items-center" @click="start">
        <up-icon name="play-circle" size="80" />
        <text class="text-block block">{{
          !divinationDetail.trigramsId ? t('起卦') : t('重新摇卦')
        }}</text>
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
  position: relative;
  border-radius: 50%;
  box-shadow: 0 0 15px 10px #ece5dd;
  height: 70vw;
  width: 70vw;
  margin: 50px 0;

  &.logo-start-animate {
    animation: content1 2s linear infinite forwards;
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content-center-1 {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: 100% 100%;
}

.content-center-2 {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: 100% 100%;
}

.content-center-3 {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: 100% 100%;
}

.text-area {
  display: flex;
  justify-content: center;
}

.btn-start-animate {
  position: relative;
  animation: btn-start 1s ease-out forwards;
  .text-block {
    opacity: 0;
    transform: scale(0);
    transition: 0.1s linear all;
  }
}

@keyframes btn-start {
  0% {
    top: 0;
  }
  40% {
    transform: scale(0.5) rotate(360deg);
    top: -400px;
  }

  85% {
    opacity: 1;
    transform: scale(0), rotate(360deg);
    top: -230px;
  }

  100% {
    opacity: 0;
    transform: scale(0), rotate(360deg);
    top: -230px;
  }
}

@keyframes logo-animate {
  100% {
    margin-top: 100px;
  }
}

@keyframes content1 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes content2 {
  100% {
    transform: rotate(-360deg);
  }
}
</style>
