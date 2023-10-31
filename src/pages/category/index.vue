<script setup lang="ts">
import { useGlobalData, useRouter } from '@uni-helper/uni-use'
import { categories } from './constant'

const a = useGlobalData(ref())
const router = useRouter()
console.log({ a: a.value, router })
const divinationStore = useDivinationStore()

function handleClick(item) {
  divinationStore.$patch({
    mode: item.name
  })
  uni.navigateBack({ delta: 1 })
}
</script>

<template>
  <view class="p-16px">
    <up-list class="b-rd-4px bg-[#ffffff]">
      <up-list-item v-for="item in categories" :key="item.key">
        <up-cell :title="item.name" @click="handleClick(item)" />
      </up-list-item>
    </up-list>
  </view>
</template>

<style scoped></style>
