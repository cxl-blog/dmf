<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SymbolImg from '@/components/divination-symbol/index.vue'

const { t } = useI18n()
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
              <text>印章</text>
              <text class="wm-ht">{{ t('本卦') }}</text>
            </view>
            <view class="flex-center flex-1">
              <SymbolImg symbol-name="qian" class="divination-img" />
              <!-- <view class="divination-img" /> -->
            </view>
            <View class="">
              <text class="lh-1px write-vertical-right"> {{ t('地风升') }} . {{ t('本卦') }} </text>
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
                >{{ t('周易第6卦初六爻') }}</text
              >
            </view>
            <u-scroll-list
              class="scroll-container min-w-0 shrink-1!"
              indicator-active-color="#ebd478"
              :indicator-style="{ left: `${Number.MAX_SAFE_INTEGER}px;` }"
            >
              <view
                class="divination-detail pb-20px pt-30px write-vertical-right write-orient-upright"
              >
                <text>
                  <text>初六爻辞，</text>
                  <br />
                  {{
                    t(
                      '初六，不永所事，小有言，终吉象曰：不永所事，讼不可长也，虽小有言，其辨明也。'
                    )
                  }}
                </text>
              </view>
            </u-scroll-list>
            <!-- <scroll-view :scroll-x="true" class="min-w-0" :scroll-left="Number.MAX_SAFE_INTEGER">
              <text class="divination-detail py-30px write-vertical-right write-orient-upright">
                <text>初六爻辞，</text>
                <br />
                {{
                  t('初六，不永所事，小有言，终吉象曰：不永所事，讼不可长也，虽小有言，其辨明也。')
                }}
              </text>
            </scroll-view> -->
          </view>
        </view>
      </up-col>
    </up-row>
    <view class="b-rd-4px bg-[#fff] p-16px">
      <view class="mb-10px">
        <text class="font-bold">{{ t('解释说明') }}</text>
      </view>
      <view>
        <text> 初六：做事不能持之以恒，稍有过错，最后还是吉利的 </text>
        <br />
        <text
          >《象辞》说：做事不能持之以恒，说明官司不可能打久下去。虽然稍有过错，但争议的双方的是非曲直终将辨别清楚。</text
        >
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

  :deep() span {
    position: relative;
    z-index: 1;
  }
}

.divination-detail {
  letter-spacing: 5px;
}

.divination-img {
  width: 50%;
  height: 74%;
}
</style>
