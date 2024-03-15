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
import CustomCalendar from '@/components/custom-calendar/index.vue'

const maxDate = dayjs().add(1, 'day').format('YYYY-MM-DD')
</script>

<template>
  <scroll-view class="h-100%!" scroll-y>
    <CustomCalendar showLunar color="#dfb986" :maxDate="maxDate" />
  </scroll-view>
</template>

<style scoped></style>
