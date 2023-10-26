import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import { setupStore } from '@/store'
import { setupI18n } from '@/i18n'

export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)
  setupI18n(app)
  return {
    app
  }
}
