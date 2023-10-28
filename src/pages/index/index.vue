<script setup lang="ts">
const title = ref('Hello')
</script>

<template>
  <view class="content w-100% p-20px">
    <view class="header w-100% flex justify-between">
      <view class="header-left color-gray">
        <text>占事</text>
      </view>
      <view class="header-right">
        <up-text suffixIcon="arrow-right" text="查看更多" />
      </view>
    </view>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin-top: 200rpx;
  margin-right: auto;
  margin-bottom: 50rpx;
  margin-left: auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
