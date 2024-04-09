<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    // 单位s
    itemAnimateTime: number
    active: boolean
  }>(),
  { itemAnimateTime: 1, active: false }
)

const textArr = [
  '周行之数六十',
  '混沌之数不尽有五',
  '天、地、国、家、性、寿有六定',
  '其用四十有九为太极',
  '水火相交物成，金木相交事行',
  '故而太极生两仪',
  '两仪生四象',
  '四象生八卦',
  '八卦生万物'
]
const totalTime = props.itemAnimateTime * textArr.length

defineExpose({
  totalTime
})
</script>

<template>
  <view class="list relative box-border h-28px w-100% px-16px text-center line-height-[normal]">
    <template v-if="active">
      <view
        v-for="(item, index) in textArr"
        :key="item"
        class="text-item"
        :style="{
          'animation-delay': `${(index + 1) * itemAnimateTime}s`,
          ' animation-duration:': `${itemAnimateTime}s`
        }"
        >{{ item }}</view
      >
    </template>
  </view>
</template>

<style scoped lang="scss">
.text-item {
  position: absolute;
  left: 0;
  right: 0;
  opacity: 0;
  transform: translateY(100%);
  animation: 1s text-animate ease forwards;
  height: 100%;
  width: 100%;
  color: $u-primary;
}

@keyframes text-animate {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  25% {
    transform: translateY(0);
    opacity: 1;
  }

  75% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}
</style>
