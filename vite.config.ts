import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni({
      vueOptions: {
        include: [/\.vue$/, /\.md$/],
        script: {
          defineModel: true
        }
      },
      vueJsxOptions: true
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.md$/],
      imports: ['vue', 'vue-i18n', 'pinia'],
      dirs: ['./src/hooks', './src/store/modules'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      dts: './auto-imports.d.ts',
      vueTemplate: true
    })
  ],
  assetsInclude: ['./src/static/**'],
  esbuild: {
    pure: ['console.log'],
    drop: ['debugger']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  server: {
    hmr: {
      overlay: false
    },
    port: 8080,
    host: true,
    headers: {
      'access-control-max-age': '1728000',
      'access-control-allow-origin': '*',
      'access-control-allow-headers': '*',
      'access-control-allow-methods': '*'
    }
  },
  optimizeDeps: {
    include: ['@vueuse/core', 'lodash-es']
  }
})
