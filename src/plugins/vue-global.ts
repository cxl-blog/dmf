import type { App } from 'vue'

export function setupVueGlobal(app: App<Element>) {
  app.config.warnHandler = () => null // TODO 暂时屏蔽警告信息

  app.config.globalProperties.__CSS_THEME_COLOR__ = __CSS_THEME_COLOR__
}
