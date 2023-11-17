import process from 'node:process'
import { defineConfig } from '@uni-helper/uni-deploy'

export default defineConfig({
  /* 通用配置 */
  // 当前进程的工作目录，默认为执行目录
  cwd: process.cwd(),
  'mp-weixin': {
    appid: 'wx3bb12404cf91f8f4'
  }
})
