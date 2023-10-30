import { createSSRApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store'
import { setupI18n } from '@/i18n'
import { setupUViewPlus } from '@/plugins/uview-plus'
import { setupVueGlobal } from '@/plugins/vue-global'
import '@/styles/index.scss'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)
  setupI18n(app)
  setupVueGlobal(app)
  setupUViewPlus(app)
  return {
    app
  }
}
