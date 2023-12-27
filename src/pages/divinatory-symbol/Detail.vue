<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Detail from '@/components/divination-symbol/Detail.vue'
import { divinationDetail } from '@/api/divination'
import type { DivinationDetail } from '@/config/divination'

const { t } = useI18n()

const { category } = storeToRefs(useDivinationStore())
const appStore = useAppStore()

const trigramsId = ref<string>('')
const detail = reactive<Partial<DivinationDetail>>({})
appStore.startLoading()

onLoad(option => {
  trigramsId.value = option!.trigramsId
})

onMounted(() => {
  getDetail()
})

function getDetail() {
  divinationDetail(unref(trigramsId), { categoryIndex: category.value })
    .then(res => {
      Object.assign(detail, res)
    })
    .finally(() => {
      appStore.endLoading()
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
  <Detail :class="{ active: detail.id }" class="detail-container" :detail="detail" />
  <view v-show="!detail.id" class="mt-20px p-16px">
    <u-loading-icon :text="t('获取卦象详情中...')" textSize="14" />
  </view>
</template>

<style scoped lang="scss">
.wm-ht {
  writing-mode: vertical-rl;
}

.detail-container {
  position: fixed;
  left: 10000px;
}

.active {
  position: relative;
  left: 0;
}

.scroll-container {
  position: relative;
  :deep() .u-scroll-list {
    position: relative;
    height: 100%;
    box-sizing: border-box;
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
