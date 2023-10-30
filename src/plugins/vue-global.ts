import type { App } from 'vue'

export function setupVueGlobal(app: App<Element>) {
  app.config.warnHandler = () => null // TODO 暂时屏蔽警告信息
}
