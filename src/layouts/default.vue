<script setup lang="ts">
import { usePage } from '@uni-helper/uni-use'
import { useCssVar } from '@vueuse/core'

const page = usePage()
const { t } = useI18n()
const { pages, pageLoading } = storeToRefs(useAppStore())
console.log({ page })

const pageConfig = computed<Partial<PageConfig>>(() => {
  return unref(pages).find(item => item.path === unref(page).route) ?? {}
})

const title = computed(() => {
  const name =
    unref(pageConfig)?.navbarTitle ?? (unref(pageConfig)?.style?.navigationBarTitleText || '算子')

  return t(name)
})
const navbarH = useCssVar('--status-bar-height')
const autoBack = computed(() => {
  return !unref(pageConfig).navbarDisableAutoBack
})
</script>

<template>
  <view>
    <up-navbar
      class="app-navbar"
      :title="title"
      :auto-back="autoBack"
      :leftIcon="autoBack ? 'arrow-left' : ''"
      placeholder
      :height="navbarH"
    />
    <view class="app-main">
      <slot></slot>
    </view>
    <u-loading-page class="page-loading" bg-color="rgba(17,14,12,0.70);" :loading="pageLoading">
      <view class="loading-content">
        <view class="loading-logo">
          <view class="loading-logo-center" />
        </view>
        <view class="loading-text">
          <text>{{ t('卜算子') }}</text>
        </view>
      </view>
    </u-loading-page>
  </view>
</template>

<style scoped lang="scss">
.app-navbar {
  height: var(--status-bar-height);
  width: 100%;

  :deep() .u-navbar__content {
    background-color: $u-bg-color !important;
    box-shadow: 0px 1px 0px 0px rgba(234, 226, 210, 0.8);
  }

  :deep() .u-navbar__content__title {
    font-size: 18px;
    font-weight: 600;
  }
}

.app-main {
  height: calc(100svh - var(--status-bar-height));
  position: relative;
}

.page-loading {
  background-color: rgba(17, 14, 12, 0.7);
  :deep() .u-loading-page__warpper__loading-icon {
    display: none;
  }
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-logo {
  $color: #b4a38c;

  padding: 8px;
  background-color: transparent;
  border: 2px solid $color;
  border-radius: 50%;
  position: relative;
  animation: logo-animate 2s linear infinite forwards;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #b4a38c;
    border-radius: 4px;
    position: absolute;
    bottom: -5px;
    left: calc(50% - 4px);
  }

  &-center {
    width: 72px;
    height: 72px;
    background-color: $color;
    border-radius: 50%;
  }
}

.loading-text {
  margin-top: 8px;
  font-size: 16px;
  color: #fff;
  font-weight: 400;
}

@keyframes logo-animate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
