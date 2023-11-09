<script setup lang="ts">
import SymbolImg from '@/components/divination-symbol/index.vue'
import type { DivinationSymbolType } from '@/config/divination'

const list = ref([
  {
    name: '乾',
    key: 'qian'
  },
  {
    name: '坤',
    key: 'kun'
  },
  {
    name: '屯',
    key: 'tun'
  },
  {
    name: '蒙',
    key: 'meng'
  },
  {
    name: '需',
    key: 'xu'
  },
  {
    name: '讼',
    key: 'song'
  },
  {
    name: '师',
    key: 'shi'
  },
  {
    name: '比',
    key: 'bi'
  },
  {
    name: '小畜',
    key: 'xiaochu'
  },
  {
    name: '履',
    key: 'lv'
  },
  {
    name: '泰',
    key: 'tai'
  },
  {
    name: '否',
    key: 'fou'
  },
  {
    name: '同人',
    key: 'tongren'
  },
  {
    name: '大有',
    key: 'dayou'
  },
  {
    name: '谦',
    key: 'qian_15'
  },
  {
    name: '豫',
    key: 'yu'
  },
  {
    name: '随',
    key: 'sui'
  },
  {
    name: '蛊',
    key: 'gu'
  },
  {
    name: '临',
    key: 'lin'
  },
  {
    name: '观',
    key: 'guan'
  },
  {
    name: '噬嗑',
    key: 'shike'
  },
  {
    name: '贲',
    key: 'ben'
  },
  {
    name: '剥',
    key: 'bo'
  },
  {
    name: '复',
    key: 'fu'
  },
  {
    name: '无妄',
    key: 'wuwang'
  },
  {
    name: '大畜',
    key: 'dachu'
  },
  {
    name: '颐',
    key: 'yi'
  },
  {
    name: '大过',
    key: 'daguo'
  },
  {
    name: '坎',
    key: 'kan'
  },
  {
    name: '离',
    key: 'li'
  },
  {
    name: '咸',
    key: 'xian'
  },
  {
    name: '恒',
    key: 'heng'
  },
  {
    name: '遁',
    key: 'dun'
  },
  {
    name: '大壮',
    key: 'dazhaung'
  },
  {
    name: '晋',
    key: 'jin'
  },
  {
    name: '明夷',
    key: 'mingyi'
  },
  {
    name: '家人',
    key: 'jiaren'
  },
  {
    name: '睽',
    key: 'kui'
  },
  {
    name: '蹇',
    key: 'jian'
  },
  {
    name: '解',
    key: 'jie'
  },
  {
    name: '损',
    key: 'sun'
  },
  {
    name: '益',
    key: 'yi_42'
  },
  {
    name: '夬',
    key: 'guai'
  },
  {
    name: '姤',
    key: 'gou'
  },
  {
    name: '萃',
    key: 'cui'
  },
  {
    name: '升',
    key: 'sheng'
  },
  {
    name: '困',
    key: 'kun_47'
  },
  {
    name: '井',
    key: 'jing'
  },
  {
    name: '革',
    key: 'ge'
  },
  {
    name: '鼎',
    key: 'ding'
  },
  {
    name: '震',
    key: 'zhen'
  },
  {
    name: '艮',
    key: 'gen'
  },
  {
    name: '渐',
    key: 'jian_53'
  },
  {
    name: '归妹',
    key: 'guimei'
  },
  {
    name: '丰',
    key: 'feng'
  },
  {
    name: '旅',
    key: 'lv_56'
  },
  {
    name: '巽',
    key: 'xun'
  },
  {
    name: '兑',
    key: 'dui'
  },
  {
    name: '涣',
    key: 'huan'
  },
  {
    name: '节',
    key: 'jie_60'
  },
  {
    name: '中孚',
    key: 'zhongfu'
  },
  {
    name: '小过',
    key: 'xiaoguo'
  },
  {
    name: '既济',
    key: 'jiji'
  },
  {
    name: '未济',
    key: 'weiji'
  }
])
</script>

<template>
  <scroll-view scroll-y>
    <up-row :gutter="20" class="box-border flex-wrap p-16px">
      <up-col v-for="(item, index) in list" :key="item.key" :span="6" class="mb-20px">
        <view class="symbol-item b-rd-10px bg-white">
          <view class="b-[1px_solid_#ccc] p-12px">
            <text>{{ index + 1 }}.{{ item.name }}</text>
          </view>
          <view class="flex items-center justify-center px-12px pb-20px pt-10px">
            <SymbolImg
              :symbol-name="(item.key as DivinationSymbolType)"
              inactive-bg-color="#fff"
              class="w-65%"
            />
          </view>
        </view>
      </up-col>
    </up-row>
  </scroll-view>
</template>

<style scoped lang="scss">
.symbol-item {
  box-shadow: 0 0 2px 3px #eee;
}
</style>
