<script setup lang="ts">
import { categoryList } from '@/api/divination'

type CategoryItem = {
  index: number
  name: string
}

const divinationStore = useDivinationStore()
const categories = ref<CategoryItem[]>([])
const appStore = useAppStore()
const { t } = useI18n()
appStore.startLoading()

onBeforeMount(() => {
  getCategories()
})

function handleClick(item: CategoryItem) {
  divinationStore.$patch({
    category: item.index,
    mode: item.name
  })
  uni.navigateBack({ delta: 1, animationType: 'slide-out-right', animationDuration: 300 })
}

function getCategories() {
  categoryList()
    .then(res => {
      categories.value = res.categories
    })
    .finally(() => {
      nextTick(() => {
        appStore.endLoading()
      })
    })
}
</script>

<template>
  <view class="list-container box-border overflow-hidden p-16px uni-weixin:p-16px">
    <view v-if="categories.length" class="list-content h-100%">
      <up-list>
        <up-list-item v-for="item in categories" :key="item.index">
          <up-cell :title="item.name" @click="handleClick(item)" />
        </up-list-item>
      </up-list>
    </view>
    <view v-else class="">
      <u-loading-icon :text="t('获取分类中...')" textSize="14" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.list-container {
  height: 100% !important;
  padding: 16px;

  .list-content {
    background-color: #fff;
    border-radius: 8px;

    :deep() .u-list {
      height: 100% !important;
    }
  }
}
</style>
