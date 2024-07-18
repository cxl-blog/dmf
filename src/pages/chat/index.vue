<script setup lang="ts">
import { chatPostMsg } from '@/api/chat'
import imgSrc from '@/static/imgs/logo_v2.png'

const { t } = useI18n()
const inputText = ref('')
const messageList = ref<Parameters<typeof chatPostMsg>[0]>([
  {
    role: 'assistant',
    content: '您好，我是您的私人解卦专家，有什么可以帮您？'
  }
])

const displayMessageList = computed(() => {
  return [...messageList.value].reverse()
})

function handlePostMsg() {
  if (!unref(inputText)) {
    return
  }

  messageList.value.push({
    role: 'user',
    content: inputText.value
  })
  const text = unref(inputText)
  inputText.value = ''
  chatPostMsg([...messageList.value])
    .then((res: any) => {
      const data = res.data.choices
      const message = data?.[0]?.message

      if (message) {
        messageList.value.splice(messageList.value.length - 1, 1, message)
      }
    })
    .catch(res => {
      console.log({ res })
      inputText.value = text
      messageList.value[-1].status = 'error'
    })
  messageList.value.push({
    role: 'assistant',
    content: '',
    status: 'loading'
  })
}
</script>

<template>
  <view class="chat-container">
    <img :src="imgSrc" class="bg-1" mode="scaleToFill" />
    <img :src="imgSrc" class="bg-2" mode="scaleToFill" />
    <view class="message-wrap">
      <view class="message-list">
        <template v-if="messageList.length">
          <view
            v-for="(item, index) in displayMessageList"
            :key="index"
            class="message-item"
            :class="{
              'message-left': item.role === 'assistant',
              'message-right': item.role === 'user'
            }"
          >
            <view class="message-icon">
              <up-avatar :text="item.role" :size="35" />
            </view>
            <view class="message-text">
              <text v-if="item.status !== 'loading'">{{ item.content }}</text>
              <up-loading-icon v-else :vertical="true" />
            </view>
          </view>
        </template>
        <view v-else class="mt-50px">
          <up-empty mode="history" icon="photo" />
        </view>
      </view>
    </view>

    <view class="input-container bg-[#f5f5f5] p-10px">
      <view class="flex items-center">
        <up-input v-model.trim="inputText" shape="circle" :placeholder="t('请输入内容')" />
        <view class="send-btn ml-10px cursor-pointer hover:color-[#b4a38c]" @click="handlePostMsg">
          <up-icon name="email" />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  .message-wrap {
    flex: 1;
    padding: 12px;
    overflow-y: auto;
  }

  .message-list {
    display: flex;
    flex-direction: column-reverse;
    gap: 18px;
  }
}

.input-container {
  background-color: #fff;
  z-index: 1;
}

.send-btn {
  :deep() .u-icon__icon {
    font-size: 30px !important;
  }
}

.message-item {
  display: flex;
  gap: 10px;
  z-index: 1;

  .message-text {
    max-width: 60%;
    min-width: 80px;
    border-radius: 6px;
    background-color: #fff;
    padding: 12px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  }

  &.message-right {
    flex-direction: row-reverse;
  }

  &.message-left {
    .message-text {
      background-color: #af8346;
      color: #fff;
    }
  }
}

.bg-1 {
  position: absolute;
  top: -100px;
  right: -100px;
  border-radius: 50%;
  opacity: 0.2;
  z-index: 1;
  height: 300px;
  width: 300px;
  transform: rotate(180deg);
}

.bg-2 {
  position: absolute;
  bottom: -100px;
  left: -100px;
  border-radius: 50%;
  opacity: 0.2;
  z-index: 1;
  height: 300px;
  width: 300px;
}
</style>
