// #ifdef MP-WEIXIN
<script lang="ts">
// 微信小程序 样式穿透
export default {
  options: { styleIsolation: 'shared' }
}
</script>
// #endif

<script setup lang="ts">
import Share from './Share.vue'

const showShare = ref(false)
</script>

<template>
  <Share v-model="showShare" />
  <view class="share-button" @click="showShare = true"> 分享 </view>
</template>

<style scoped lang="scss">
.share-button {
  position: fixed;
  right: 10px;
  bottom: 100px;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid #ccc;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 6px 6px #ebe1d5;
}
</style>
