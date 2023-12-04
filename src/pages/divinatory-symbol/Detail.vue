<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SymbolImg from '@/components/divination-symbol/index.vue'
import { divinationDetail } from '@/api/divination'
import BizScroll from '@/components/biz-scroll/index.vue'
import { DIVINATION_SYMBOL } from '@/constants/divination'
import type { DivinationDetail } from '@/config/divination'
import { convertToChinaNum } from '@/utils'
import sealSrc from '@/static/imgs/seal.png'

const { t } = useI18n()

// const router = useRouter()
const { category } = storeToRefs(useDivinationStore())
const { pageLoading, scheme } = storeToRefs(useAppStore())
const trigramsId = ref<string>('')
const detail = reactive<Partial<DivinationDetail>>({})
const bizScrollRef = ref()
const symbolId = computed(() => {
  return DIVINATION_SYMBOL[detail.id!]?.key
})

onLoad(option => {
  trigramsId.value = option!.trigramsId
})

const symbolActiveColor = computed(() => {
  return scheme.value === 'light' ? 'rgba(0, 0, 0, 0.7)' : '#f5f5f5'
})

pageLoading.value = true

onBeforeMount(() => {
  getDetail()
})

function getDetail() {
  divinationDetail(unref(trigramsId), { categoryIndex: category.value })
    .then(res => {
      Object.assign(detail, res)
    })
    .finally(() => {
      pageLoading.value = false
    })
}
</script>

<template>
  <view class="h-60vh p-16px">
    <up-row :gutter="20" class="mb-20px h-60%" justify="space-between">
      <up-col :span="6" class="h-100%">
        <view class="h-100% b-2px b-[#000] b-rd-4px b-solid bg-white p-8px">
          <view
            class="box-border h-100% flex flex-col b-1px b-[#000] b-rd-4px b-solid px-12px py-10px align-start"
          >
            <view class="flex justify-between pt-12px">
              <up-image :src="sealSrc" width="20px" height="20px" :fade="true" />
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
      <up-col :span="6" class="h-100%">
        <view class="box-border h-100% b-2px b-[#000] b-rd-4px b-solid bg-white p-8px">
          <view
            class="box-border h-100% flex flex-row-reverse b-1px b-[#000] b-rd-4px b-solid px-12px py-10px"
          >
            <view class="relative ml-20px mr--12px flex items-center">
              <text
                class="divination-name w-16px w-16px b-1px b-r-0px b-[#000] b-solid px-8px py-5px line-height-20px write-vertical-right write-orient-upright"
                >{{ t(`周易第${convertToChinaNum(detail.id!)}卦`) }}</text
              >
            </view>
            <BizScroll
              ref="bizScrollRef"
              class="scroll-container min-w-0 shrink-1!"
              indicator-active-color="#ebd478"
              :scrollViewAttrs="{
                left: Number.MAX_SAFE_INTEGER
              }"
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
      </up-col>
    </up-row>
    <view class="b-rd-4px bg-[#fff] p-16px">
      <view class="mb-10px">
        <text class="font-bold">{{ t('解读说明') }}</text>
      </view>
      <view>
        <text> {{ detail.description }} </text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.wm-ht {
  writing-mode: vertical-rl;
}

.scroll-container {
  :deep() .u-scroll-list__scroll-view,
  :deep() .u-scroll-list__scroll-view__content {
    height: 100%;
  }

  :deep() .u-scroll-list__indicator {
    margin-top: 0;
  }
}

.divination-name {
  position: relative;
  letter-spacing: 5px;
  padding-top: 20px;
  $wrap-h: 45px;

  &::before {
    content: '';
    width: 100%;
    height: $wrap-h;
    background-color: black;
    position: absolute;
    top: 0;
    left: 0;
  }

  &::after {
    border-radius: 100%;
    width: 100%;
    height: $wrap-h * 2;
    content: '';
    background-color: #fff;
    // background-color: transparent;
    position: absolute;
    top: 2px;
    left: 0;
  }

  // :deep() * {
  //   position: relative;
  //   z-index: 1;
  // }
}

.divination-detail {
  letter-spacing: 5px;
}

.divination-img {
  width: 55%;
}
</style>
