<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import imgSrc from '@/static/imgs/page-tooltip.svg'

withDefaults(
  defineProps<{
    version: 1 | 2 | 3
  }>(),
  {
    version: 1
  }
)

const { t } = useI18n()
const messages = {
  1: t('专注占筮，心诚则灵；命由天定，行由人谋'),
  2: t('心诚所向，命运可测；天数有定，人为能转。神卜谷，启智慧之门'),
  3: t(
    '以诚心询问，方开天机。命由天定，行由人为。探索周易，洞悉未来，亦可塑造命运。卜筮之前，心存敬畏，用智慧引导人生'
  )
}
</script>

<template>
  <view class="flex items-center justify-center py-20px text-12px color-gray"
    ><img :src="imgSrc" class="h-16px w-16px" alt="tooltip" />
    <text class="ml-5px">{{ messages[version] }}</text>
  </view>
</template>

<style scoped></style>
