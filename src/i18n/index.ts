import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import zhCN from './locales/zh-CN'
import en from './locales/en'

type ZhCn = typeof zhCN
type En = typeof en

const { getLocale } = useLocale()
const i18n = createI18n<[ZhCn, En], LocaleType>({
  locale: getLocale(),
  legacy: false,
  globalInjection: false,
  fallbackLocale: 'zh-CN',
  // 暂时忽略警告
  silentFallbackWarn: true,
  silentTranslationWarn: true,
  missingWarn: false,
  warnHtmlInMessage: 'off',
  warnHtmlMessage: false,
  fallbackWarn: false,
  messages: {
    en: {
      ...en
    },
    'zh-CN': {
      ...zhCN
    }
  }
})

const { t } = i18n.global

export function setupI18n(app: App<Element>) {
  app.use(i18n)
}

export { i18n, t }
