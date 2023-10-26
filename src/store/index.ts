import type { Pinia, Store } from 'pinia'
import type { App } from 'vue'

const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)
}

export function resetAllStore() {
  const { _s: modules } = store as unknown as Pinia & { _s: Map<string, Store> }
  for (const [, _store] of modules) {
    _store.$reset()
  }
}

export { store }
