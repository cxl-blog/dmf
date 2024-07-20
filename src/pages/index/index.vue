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
import { usePage } from '@uni-helper/uni-use'
import { customerTrigrams, divinationDetail as divinationDetailReq } from '@/api/divination'

import imgSrc from '@/static/imgs/logo_v2_5x.png'
import startSrc from '@/static/imgs/start.svg'
import restartSrc from '@/static/imgs/restart.svg'
import showDetailSrc from '@/static/imgs/show-detail.svg'
import type { DivinationDetail } from '@/config/divination'
import DetailPopup from '@/components/divination-symbol/DetailPopup.vue'
import WritingCeremony from '@/components/writing-ceremony/index.vue'

const { mode, category } = storeToRefs(useDivinationStore())
const { t } = useI18n()
const divinationDetail = reactive({
  id: '',
  trigramsId: ''
})
const detail = reactive<Partial<DivinationDetail>>({})
const appStore = useAppStore()
const page = usePage()
const startLoading = ref(false)
const showPopup = ref(false)
const { isShaking } = useShake()
const loadingData = ref(false)
const { addItem } = useHistory()
// const list = ref(['神卜', t('黄历')])
const currentTab = ref(0)
const init = ref(false)
const autoStart = ref(false)
const writingRef = ref<ComponentRef<typeof WritingCeremony>>()
const centerAnimateTime = ref('1.5s')
appStore.startLoading()

watch(
  () => page.value.route as string,
  val => {
    if ('pages/index/index'.includes(val)) {
      currentTab.value = 0
    }

    if ('pages/calendar/index'.includes(val)) {
      currentTab.value = 1
    }
  }
)

watch(mode, () => {
  reset()
})

watch(isShaking, val => {
  if (loadingData.value || showPopup.value || !init.value) {
    return
  }

  if (val) {
    uni.vibrateLong()
    handleShakeWithDebounce()
  }
})

const handleShakeWithDebounce = useDebounce(handleShake, 200, { leading: true })

onLoad(option => {
  autoStart.value = option!.autoStart === 'true'
})

onMounted(() => {
  appStore.endLoading()
  const timer = setTimeout(() => {
    init.value = true
    clearTimeout(timer)
  }, 1000)

  if (unref(autoStart)) {
    start()
  }
})

function reset() {
  for (const [key] of Object.entries(divinationDetail)) {
    Reflect.deleteProperty(divinationDetail, key)
  }
}

function jumpTo() {
  uni.navigateTo({ url: '/pages-other/category/index' })
}

function handleShowDetail() {
  uni.navigateTo({
    url: `/pages-other/divinatory-symbol/Detail?trigramsId=${divinationDetail.trigramsId}`,
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
    try {
      const res = await customerTrigrams({
        categoryIndex: category.value,
        auspiciousOrNormal: true
      })
      Object.assign(divinationDetail, res)
      await nextTick()
      await getDetail()
    } catch (error) {}
    startLoading.value = false
    loadingData.value = false
    clearTimeout(timer)
  }, unref(writingRef)!.totalTime * 1000 || 1500)
}

async function getDetail() {
  appStore.startLoading()
  await divinationDetailReq(divinationDetail.trigramsId, { categoryIndex: category.value })
    .then(res => {
      Object.assign(detail, res)
      addItem({ ...res, time: Date() })
    })
    .finally(() => {
      showPopup.value = true
      appStore.endLoading()
    })
}
</script>

<template>
  <view class="content box-border h-100% w-100% p-20px">
    <!-- <view class="mb-16px w-100%">
      <u-subsection
        :list="list"
        :current="currentTab"
        :active-color="__CSS_THEME_COLOR__"
        @change="handleTabChange"
      />
    </view> -->
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

    <WritingCeremony ref="writingRef" class="relative mb-20px w-100%" :active="startLoading" />

    <view class="content-footer w-100% flex flex-1 justify-between">
      <view class="flex flex-1 flex-col items-center" @click="start">
        <up-image
          :src="!divinationDetail.trigramsId ? startSrc : restartSrc"
          width="80px"
          height="80px"
          :fade="false"
          :lazyLoad="false"
        />
        <text class="text-block block">{{
          !divinationDetail.trigramsId ? t('摇一次') : t('再来一次')
        }}</text>
      </view>
      <view
        v-show="divinationDetail.trigramsId"
        class="flex flex-1 flex-col items-center"
        @click="handleShowDetail"
      >
        <up-image :src="showDetailSrc" width="80px" height="80px" :fade="false" :lazyLoad="false" />
        <text class="block">{{ t('查看详情') }}</text>
      </view>
    </view>

    <DetailPopup v-model="showPopup" :detail="(detail as DivinationDetail)" />
  </view>
</template>

<style lang="scss" scoped>
.content-center {
  flex-shrink: 0;
  position: relative;
  border-radius: 50%;
  // box-shadow: 0 0 15px 10px #ece5dd;
  box-shadow: 0 0 20px 20px #ebe1d5;
  height: 70vw;
  width: 70vw;
  overflow: hidden;
  //margin: 50px 0;
  margin-top: 50px;
  margin-bottom: 24px;
  transition: 0.3s all ease;

  &.logo-start-animate {
    animation: content1 v-bind(centerAnimateTime) linear infinite forwards;
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.3 all ease;

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

.content-center-1 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  border-radius: 50%;
  background-size: 100% 100%;
  // transform: scale(0.96);
  transform: scale(1.25);
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
