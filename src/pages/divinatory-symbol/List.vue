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
  <scroll-view scroll-y class="box-border h-100% p-[0_16px_0_16px]">
    <view class="pt-16px container">
      <template v-for="item in list" :key="item.key">
        <view class="symbol-item relative b-[1px_solid_#ccc] b-rd-10px bg-[#ffffff] py-16px">
          <view class="item-name">
            <text>{{ item.name }}</text>
          </view>
          <view class="flex items-center justify-center">
            <SymbolImg
              class="h-100% w-80% opacity-50"
              inactive-bg-color="#ffffff"
              :symbol-name="(item.key as DivinationSymbolType)"
              :offsetItemY="8"
              active-bg-color="#dbbd95"
            />
          </view>
        </view>
      </template>
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  /*  声明列的宽度  */
  grid-template-columns: repeat(2, auto);
  grid-gap: 20px;
}
.symbol-item {
  box-shadow: 0 0 2px 3px #eee;
}

.item-name {
  position: absolute;
  font-size: 36px;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 50%;
  border: 2px solid #dbbd95;
  height: 80px;
  box-sizing: border-box;
  width: 80px;
  line-height: 80px;
  text-align: center;
  color: #b2a7a7;
}
</style>
