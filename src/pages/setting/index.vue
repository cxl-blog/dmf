// #ifdef MP-WEIXIN
<script lang="ts">
// 微信小程序 样式穿透
export default {
  options: { styleIsolation: 'shared' }
}
</script>
// #endif

<script setup lang="ts">
import dayjs from 'dayjs'
import { Lunar } from 'lunar-typescript'
import imgSrc from '~@/static/imgs/logo_v2.png'

const { t } = useI18n()
const { layout } = storeToRefs(useAppStore())
const lunar = Lunar.fromDate(new Date())
const offsetTop = computed(() => {
  return layout.value.statusHeight + layout.value.navbarHeight || 0
})

// const headerHpx = computed(() => {
//   return `${unref(offsetTop)}px`
// })

const headerTpx = computed(() => {
  return `${unref(offsetTop) + 20}px`
})

const setting = reactive({
  openModel: true
})
</script>

<template>
  <view class="relative h-100% flex flex-col">
    <img :src="imgSrc" class="bg-1" mode="scaleToFill" />
    <img :src="imgSrc" class="bg-2" mode="scaleToFill" />

    <scroll-view scroll-y class="h-100%!">
      <div class="h-100% flex flex-col">
        <div class="setting-header color-[#e5e5e5] [&_.u-tag]:h-18px!">
          <view>
            <text class="letter-spacing-[22px] mb-10px text-22px font-bold">
              {{ lunar.getYearInGanZhiByLiChun() }}({{ lunar.getYearShengXiao() }}){{ t('年') }}
            </text>
          </view>
          <view class="mb-20px">
            <text>
              {{ lunar.toString() }}
            </text>
            <view class="mt-5px text-12px">
              {{ dayjs().format('YYYY-MM-DD') }}
            </view>
          </view>

          <view class="mb-10px flex text-12px">
            <u-tag :text="t('宜')" type="success" plain size="mini" />
            <text class="ml-10px">{{ lunar.getDayYi().toString() }}</text>
          </view>
          <view class="flex text-12px">
            <u-tag :text="t('忌')" type="error" plain size="mini" />
            <text class="ml-10px">{{ lunar.getDayJi().toString() }}</text>
          </view>
        </div>
        <div class="setting-content flex-1">
          <view class="px-18px py-12px">
            <text class="color-gray">{{ t('基本设置') }}</text>
          </view>
          <u-cell-group>
            <!-- <u-cell
              icon="setting-fill"
              :title="t('个人设置')"
              :isLink="true"
              arrow-direction="right"
            /> -->
            <u-cell icon="heart-fill" :title="t('模式选择')" disabled>
              <template #value>
                <view class="flex items-center">
                  <text class="mr-5px color-gray">
                    {{ setting.openModel ? t('快乐模式') : t('标准模式') }}
                  </text>
                  <u-switch
                    v-model="setting.openModel"
                    space="2"
                    activeColor="#f9ae3d"
                    disabled
                    inactiveColor="rgb(230, 230, 230)"
                  />
                </view>
              </template>
            </u-cell>
          </u-cell-group>
        </div>
      </div>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.bg-1 {
  position: absolute;
  top: -100px;
  right: -100px;
  border-radius: 50%;
  opacity: 0.2;
  z-index: 1;
  height: 300px;
  width: 300px;
  transform: rotate(180deg);
}

.bg-2 {
  position: absolute;
  bottom: -100px;
  left: -100px;
  border-radius: 50%;
  opacity: 0.2;
  z-index: 1;
  height: 300px;
  width: 300px;
}

.setting-header {
  background: linear-gradient(140deg, #745224, #b4a38c63);
  // height: calc(140px + v-bind(headerHpx));
  padding: v-bind(headerTpx) 20px 40px 20px;
  box-sizing: border-box;
}

.setting-content {
  background-color: $u-bg-color;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: -20px;
  padding: 20px 10px;
}
</style>
