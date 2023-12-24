<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SymbolImg from '@/components/divination-symbol/index.vue'
import { divinationDetail } from '@/api/divination'
import BizScroll from '@/components/biz-scroll/index.vue'
import { DIVINATION_SYMBOL } from '@/constants/divination'
import type { DivinationDetail } from '@/config/divination'
import { convertToChinaNum } from '@/utils'
import sealSrc from '@/static/imgs/seal.png'
import bgSrc from '@/static/imgs/detail_bg1x.png'

const { t } = useI18n()

const { category } = storeToRefs(useDivinationStore())
const { pageLoading, scheme } = storeToRefs(useAppStore())
const trigramsId = ref<string>('')
const detail = reactive<Partial<DivinationDetail>>({})
const symbolId = computed(() => {
  return DIVINATION_SYMBOL[detail.id!]?.key
})

onLoad(option => {
  trigramsId.value = option!.trigramsId
})

const symbolActiveColor = computed(() => {
  return scheme.value === 'light' ? '#505050' : '#505050'
})
const bizScrollLeft = ref(0)

pageLoading.value = true

onMounted(() => {
  getDetail()
})

function getDetail() {
  divinationDetail(unref(trigramsId), { categoryIndex: category.value })
    .then(res => {
      Object.assign(detail, res)
    })
    .finally(() => {
      nextTick(async () => {
        bizScrollLeft.value = Number.MAX_SAFE_INTEGER
        pageLoading.value = false
      })
    })
}

// async function computedNameRect() {
//   return new Promise(resolve => {
//     uni
//       .createSelectorQuery()
//       .select('.divination-detail-container .divination-name')
//       .boundingClientRect(data => {
//         Object.assign(nameRect, data)
//         resolve(null)
//       })
//       .exec()
//   })
// }
</script>

<template>
  <view class="divination-detail-container p-16px">
    <view class="mb-20px">
      <up-row :gutter="20" justify="space-between">
        <up-col :span="6">
          <view class="box-border h-320px b-2px b-[#000] b-rd-4px b-solid bg-white p-8px">
            <view
              class="box-border h-100% flex flex-col b-1px b-[#000] b-rd-4px b-solid px-12px py-10px align-start"
            >
              <view class="flex justify-between pt-12px">
                <up-image
                  :src="sealSrc"
                  width="20px"
                  height="20px"
                  :fade="false"
                  :lazyLoad="false"
                />
                <text class="wm-ht">{{ t('本卦') }}</text>
              </view>
              <view class="flex-center flex-1">
                <SymbolImg
                  v-if="symbolId"
                  :symbol-name="symbolId"
                  inactiveBgColor="#ffffff"
                  :active-bg-color="symbolActiveColor"
                  class="divination-img"
                />
              </view>
              <View class="">
                <text class="text-12px lh-[normal] write-vertical-right">
                  {{ detail.alias }} . {{ t('本卦') }}
                </text>
              </View>
            </view>
          </view>
        </up-col>
        <up-col :span="6">
          <view class="box-border h-320px b-2px b-[#000] b-rd-4px b-solid bg-white p-8px">
            <view
              class="box-border h-100% flex flex-row-reverse b-1px b-[#000] b-rd-4px b-solid px-12px py-10px"
            >
              <view class="relative ml-20px mr--10px flex items-center">
                <view
                  class="divination-name w-16px w-16px px-8px py-5px line-height-20px write-vertical-right write-orient-upright"
                >
                  <image :src="bgSrc" class="name-bg-image" mode="scaleToFill" />
                  {{ t(`周易第${convertToChinaNum(detail.id!)}卦`) }}
                </view>
              </view>
              <view class="scroll-container relative min-w-0 flex-1">
                <BizScroll
                  indicator-active-color="#ebd478"
                  class="h-100%"
                  :initScrollLeft="bizScrollLeft"
                >
                  <view
                    class="divination-detail pb-20px pt-30px write-vertical-right write-orient-upright"
                  >
                    <text>
                      {{ detail.hexagramRecord }}{{ detail.hexagramRecordExplanation }}<br />
                      {{ detail.symbol }}{{ detail.symbolicExplanation }}
                    </text>
                  </view>
                </BizScroll>
              </view>
            </view>
          </view>
        </up-col>
      </up-row>
    </view>

    <view class="b-rd-4px bg-[#fff] p-16px">
      <view class="mb-10px">
        <text class="font-bold">{{ t('解读说明') }}</text>
      </view>
      <view>
        <text> {{ detail.description || t('暂无解读说明') }} </text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.wm-ht {
  writing-mode: vertical-rl;
}

.scroll-container {
  position: relative;
  :deep() .u-scroll-list {
    position: relative;
    height: 100%;
  }

  :deep() .u-scroll-list__scroll-view,
  :deep() .u-scroll-list__scroll-view__content {
    height: 100%;
  }

  :deep() .u-scroll-list__indicator {
    margin-top: 0;
  }
}

$wrap-h: 45px;
.divination-name {
  position: relative;
  letter-spacing: 5px;
  padding-top: 20px;
  transition: all 0.2s ease;

  .name-bg-image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: all 0.2s ease;
  }
}

.name-before {
  content: '';
  width: 100%;
  height: $wrap-h;
  background-color: black;
  position: absolute;
  top: 64px;
  left: 0;
}

.name-after {
  border-radius: 100%;
  width: 100%;
  height: $wrap-h * 2;
  content: '';
  background-color: transparent;
  position: absolute;
  top: 66px;
  left: 0;
}

.divination-detail {
  letter-spacing: 5px;
}

.divination-img {
  width: 55%;
}
</style>
