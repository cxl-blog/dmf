<script setup lang="ts">
import { categoryList } from '@/api/divination'

type CategoryItem = {
  index: number
  name: string
}

const divinationStore = useDivinationStore()
const categories = ref<CategoryItem[]>([])

onBeforeMount(() => {
  getCategories()
})

function handleClick(item: CategoryItem) {
  divinationStore.$patch({
    category: item.index,
    mode: item.name
  })
  uni.navigateBack({ delta: 1, animationType: 'pop-out' })
}

function getCategories() {
  categoryList().then(res => {
    categories.value = res.categories
    const item = categories[0]
    divinationStore.$patch({
      category: item.index,
      mode: item.name
    })
  })
}
</script>

<template>
  <up-list class="list-container box-border p-16px">
    <up-list-item v-for="item in categories" :key="item.index">
      <up-cell :title="item.name" @click="handleClick(item)" />
    </up-list-item>
  </up-list>
</template>

<style scoped lang="scss">
.list-container {
  background-color: $u-bg-color;
  height: 100% !important;

  :deep() > div {
    border-radius: 8px;
    background-color: #fff;
  }
}
</style>
