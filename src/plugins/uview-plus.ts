import UViewPlus from 'uview-plus'
import type { App } from 'vue'

export function setupUViewPlus(app: App<Element>) {
  app.use(UViewPlus)
}
