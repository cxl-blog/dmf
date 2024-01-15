// #ifdef MP-WEIXIN
<script lang="ts">
// 微信小程序 样式穿透
export default {
  options: { styleIsolation: 'shared' }
}
</script>
// #endif

<script setup lang="ts">
import SymbolImg from '@/components/divination-symbol/index.vue'
import { DIVINATION_SYMBOL } from '@/constants/divination'
import type { DivinationDetail } from '@/config/divination'
import { convertToChinaNum } from '@/utils'
import sealSrc from '@/static/imgs/seal.png'
import bgSrc from '@/static/imgs/detail_bg1x.png'
import lineSrc from '@/static/imgs/line-short.png'

const props = withDefaults(
  defineProps<{
    detail: Partial<DivinationDetail>
  }>(),
  {
    detail: () => ({})
  }
)

const { t } = useI18n()
const bizScrollLeft = ref(0)
const symbolId = computed(() => {
  return DIVINATION_SYMBOL[props.detail.id!]?.key
})
const instance = getCurrentInstance()

watch(
  () => props.detail,
  () => {
    nextTick(() => {
      getWidth()
    })
  },
  {
    deep: true
  }
)

onMounted(() => {
  getWidth()
})

onReady(() => {
  getWidth()
})

function getWidth() {
  return new Promise(resolve => {
    uni
      .createSelectorQuery()
      .in(instance)
      .select('.divination-detail')
      .boundingClientRect((data: any) => {
        bizScrollLeft.value = data.width || 500
        resolve(null)
      })
      .exec()
  })
}
</script>

<template>
  <scroll-view scroll-y class="h-100%!">
    <view class="divination-detail-container p-16px">
      <view class="mb-20px">
        <up-row :gutter="20" justify="space-between">
          <up-col :span="6">
            <view class="box-border h-320px b-2px b-[#000] b-rd-4px b-solid bg-white p-8px">
              <view
                class="relative box-border h-100% flex flex-col b-1px b-[#000] b-rd-4px b-solid px-12px py-10px align-start"
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
                <view class="mb-60px flex-center flex-1">
                  <SymbolImg
                    v-if="symbolId"
                    :symbol-name="symbolId"
                    inactiveBgColor="#ffffff"
                    active-bg-color="#505050"
                    class="w-60%"
                  />
                </view>
                <View class="detail-alias absolute bottom-10px">
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
                <view class="detail-header-right relative ml-10px mr--10px flex items-center">
                  <view
                    class="divination-name w-16px w-16px px-8px py-5px line-height-20px write-vertical-right write-orient-upright"
                  >
                    <image :src="bgSrc" class="name-bg-image" mode="scaleToFill" />
                    {{ t(`周易第${convertToChinaNum(detail.id!)}卦`) }}
                  </view>
                </view>
                <view
                  class="scroll-comment-container divination-detail relative min-w-0 flex flex-1 items-center justify-center py-40px write-vertical-right write-orient-upright"
                >
                  <text v-if="!detail.hexagramRecord">
                    {{ t('暂无信息') }}
                  </text>
                  <text>
                    {{ detail.hexagramRecord }}
                  </text>
                  <!-- <BizScroll
                    indicator-active-color="#ebd478"
                    class="h-100%"
                    :initScrollLeft="bizScrollLeft"
                  >
                    <view
                      class="divination-detail min-w-100% py-10px text-14px write-vertical-right write-orient-upright"
                    >
                      <text v-if="!detail.hexagramRecord">
                        {{ t('暂无信息') }}
                      </text>
                      <text>
                        {{ detail.hexagramRecord }}
                      </text>
                    </view>
                  </BizScroll> -->
                </view>
              </view>
            </view>
          </up-col>
        </up-row>
      </view>

      <view class="mb-20px flex items-center justify-center text-center text-14px">
        <img :src="lineSrc" class="category-img-left h-6px w-25vw" alt="line" />
        <text class="shrink-0 px-12px">{{ detail.category }}</text>
        <img :src="lineSrc" class="h-6px w-25vw" alt="line" />
      </view>

      <view class="desc-container">
        <view class="desc-content">
          <view class="mb-10px">
            <text class="font-bold">{{ t('解读说明') }}</text>
          </view>
          <view>
            <text class="text-display"> {{ detail.description || t('暂无解读说明') }} </text>
          </view>
        </view>
      </view>

      <view class="other-info-container my-20px bg-white!">
        <u-collapse>
          <u-collapse-item title="卦辞解释" name="hexagramRecordExplanation">
            <text class="u-collapse-content text-display-small">{{
              detail.hexagramRecordExplanation || t('暂无数据')
            }}</text>
          </u-collapse-item>
          <u-collapse-item title="象曰" name="symbol">
            <text class="u-collapse-content text-display-small">{{
              detail.symbol || t('暂无数据')
            }}</text>
          </u-collapse-item>
          <u-collapse-item title="象曰解释" name="symbolicExplanation">
            <text class="u-collapse-content text-display-small">{{
              detail.symbolicExplanation || t('暂无数据')
            }}</text>
          </u-collapse-item>
          <u-collapse-item :title="`${detail.name}卦释义`" name="generalExplanation">
            <text class="u-collapse-content text-display-small">{{
              detail.generalExplanation || t('暂无数据')
            }}</text>
          </u-collapse-item>
        </u-collapse>
      </view>
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
.scroll-comment-container {
  position: relative;
  overflow: hidden;
  :deep(.u-scroll-list) {
    position: relative;
    height: 100%;
    box-sizing: border-box;
  }

  :deep(.u-scroll-list__scroll-view),
  :deep(.u-scroll-list__scroll-view__content) {
    height: 100%;
    box-sizing: border-box;
  }

  :deep(.u-scroll-list__indicator) {
    margin-top: 0;
  }
}

.detail-alias {
  letter-spacing: 1px;
}

.category-img-left {
  transform: rotate(180deg);
}

.wm-ht {
  writing-mode: vertical-rl;
}

.desc-container {
  background: #ffffff;
  border: 2px solid rgba(51, 51, 51, 1);
  box-shadow: 0px 2px 4px 0px rgba(234, 226, 210, 0.5);
  border-radius: 4px;
  padding: 8px;

  .desc-content {
    border: 1px solid rgba(51, 51, 51, 1);
    box-shadow: 0px 2px 4px 0px rgba(234, 226, 210, 0.5);
    border-radius: 4px;
    padding: 14px;
  }
}

.text-display {
  /* #ifndef MP-WEIXIN */
  :deep() span {
    display: block;
  }
  /* #endif */

  /* #ifdef MP-WEIXIN */
  display: block;
  /* #endif */

  text-indent: 32px;
  line-height: 24px;
}

.text-display-small {
  /* #ifndef MP-WEIXIN */
  :deep() span {
    display: block;
  }
  /* #endif */

  /* #ifdef MP-WEIXIN */
  display: block;
  /* #endif */

  text-indent: 28px;
  line-height: 22px;
}

.other-info-container {
  border: 2px solid rgba(51, 51, 51, 1);
  border-radius: 4px;
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

.scroll-a {
  :deep() .uni-scroll-view-content {
    height: 100%;
    position: relative;
  }
}
</style>
