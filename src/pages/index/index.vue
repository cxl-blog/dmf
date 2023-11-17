<script setup lang="ts">
import { customerTrigrams } from '@/api/divination'

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
  startLoading.value = true
  const res = await customerTrigrams()

  setTimeout(() => {
    startLoading.value = false
    Object.assign(divinationDetail, res)
  }, 3000)
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
      <view class="content-center-1" :class="{ 'content-center-1-animate': startLoading }" />
      <view class="content-center-2" :class="{ 'content-center-2-animate': startLoading }" />
      <view class="content-center-3" :class="{ 'content-center-3-animate': startLoading }" />
    </view>
    <view class="content-footer w-100% flex justify-between">
      <view
        class="flex flex-1 flex-col items-center"
        :class="{ 'btn-start-animate': startLoading }"
        @click="start"
      >
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
  background: conic-gradient(red, orange);

  &-animate {
    animation: content1 1s linear infinite forwards;
    animation-delay: 1.3s;
  }
}

.content-center-2 {
  position: absolute;
  width: 60%;
  height: 60%;
  margin: 20%;
  border-radius: 50%;
  background: conic-gradient(rgb(141, 141, 38), rgb(0, 255, 98));
  &-animate {
    animation: content2 1s linear infinite forwards;
    animation-delay: 1.3s;
  }
}

.content-center-3 {
  position: absolute;
  width: 30%;
  height: 30%;
  border-radius: 50%;
  background: conic-gradient(rgb(255, 221, 249), rgb(85, 0, 255));
  margin: 35%;

  &-animate {
    animation: content1 1s linear infinite forwards;
    animation-delay: 1.3s;
  }
}

.text-area {
  display: flex;
  justify-content: center;
}

.logo-start-animate {
  animation: logo-animate 0.3s ease-in forwards;
  animation-delay: 1s;
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
