// #ifdef MP-WEIXIN
<script lang="ts">
// 微信小程序 样式穿透
export default {
  options: { styleIsolation: 'shared' }
}
</script>
// #endif

<script setup lang="ts">
import { nextTick } from 'vue'
import { customerTrigrams, divinationDetail as divinationDetailReq } from '@/api/divination'
import imgSrc from '~@/static/imgs/logo_v1.png'
import startSrc from '@/static/imgs/start.svg'
import restartSrc from '@/static/imgs/restart.svg'
import showDetailSrc from '@/static/imgs/show-detail.svg'
import type { DivinationDetail } from '@/config/divination'
import Detail from '@/components/divination-symbol/Detail.vue'

const { mode } = storeToRefs(useDivinationStore())
const { t } = useI18n()
const divinationDetail = reactive({
  id: '',
  trigramsId: ''
})
const { category } = storeToRefs(useDivinationStore())
const detail = reactive<Partial<DivinationDetail>>({})
const appStore = useAppStore()
const startLoading = ref(false)
const showPopup = ref(false)
const { isShaking } = useShake()
const loadingData = ref(false)

watch(isShaking, val => {
  if (loadingData.value || showPopup.value) {
    return
  }

  if (val) {
    showPopup.value = false
    startLoading.value = true
  } else {
    uni.vibrateLong({
      complete() {
        handleShake()
      }
    })
  }
})

watch(mode, () => {
  reset()
})

function reset() {
  for (const [key] of Object.entries(divinationDetail)) {
    Reflect.deleteProperty(divinationDetail, key)
  }
}

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

  handleShake()
}

function handleShake() {
  startLoading.value = true
  loadingData.value = true
  const timer = setTimeout(async () => {
    const res = await customerTrigrams()
    Object.assign(divinationDetail, res)
    await nextTick()
    startLoading.value = false
    await getDetail()
    loadingData.value = false
    clearTimeout(timer)
  }, 1000)
}

async function getDetail() {
  appStore.startLoading()
  await divinationDetailReq(divinationDetail.trigramsId, { categoryIndex: category.value })
    .then(res => {
      Object.assign(detail, res)
    })
    .finally(() => {
      showPopup.value = true
      appStore.endLoading()
    })
}
</script>

<template>
  <view class="content box-border h-100% w-100% p-20px">
    <view class="header w-100% flex justify-between">
      <view class="header-left color-gray">
        <text>{{ mode }}</text>
      </view>
      <view class="header-right">
        <up-text suffixIcon="arrow-right" :text="t('查看更多')" @click="jumpTo" />
      </view>
    </view>
    <view class="content-center" :class="{ 'logo-start-animate': startLoading }">
      <img :src="imgSrc" class="content-center-1" mode="scaleToFill" />
    </view>
    <view class="content-footer w-100% flex justify-between">
      <view class="flex flex-1 flex-col items-center" @click="start">
        <up-image
          :src="!divinationDetail.trigramsId ? startSrc : restartSrc"
          width="80px"
          height="80px"
          :fade="false"
          :lazyLoad="false"
        />
        <text class="text-block block">{{
          !divinationDetail.trigramsId ? t('起卦') : t('重新摇卦')
        }}</text>
      </view>
      <view
        v-show="divinationDetail.trigramsId"
        class="flex flex-1 flex-col items-center"
        @click="handleShowDetail"
      >
        <up-image :src="showDetailSrc" width="80px" height="80px" :fade="false" :lazyLoad="false" />
        <text class="block">{{ t('查看卦象') }}</text>
      </view>
    </view>

    <u-popup
      :show="showPopup"
      :round="10"
      mode="bottom"
      closeable
      :customStyle="{
        height: '75%',
        background: '#f7f5f1'
      }"
      @close="showPopup = false"
    >
      <Detail
        v-if="showPopup"
        :show-page-tooltip="true"
        :detail="detail"
        class="detail-item box-border h-100% pt-44px"
      />
    </u-popup>
  </view>
</template>

<style lang="scss" scoped>
.content-center {
  position: relative;
  border-radius: 50%;
  box-shadow: 0 0 15px 10px #ece5dd;
  box-shadow: 0 0 20px 20px #ebe1d5;
  height: 70vw;
  width: 70vw;
  margin: 50px 0;

  &.logo-start-animate {
    animation: content1 1.5s linear infinite forwards;
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  :deep() .u-slide-up-enter-to {
    height: 75%;

    .u-popup__content {
      background-color: $u-bg-color;
    }
  }

  :deep() .popup__content__close--top-right {
    padding: 5px;
  }
}

.detail-item {
  :deep() .divination-detail-container {
    padding-top: 0;
  }
}

.content-center-1 {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: 100% 100%;
  transform: scale(0.96);
}

.text-area {
  display: flex;
  justify-content: center;
}

@keyframes content1 {
  100% {
    transform: rotate(360deg);
  }
}
</style>
