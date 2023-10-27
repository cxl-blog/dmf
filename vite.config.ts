import { URL, fileURLToPath } from 'node:url'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

const root = process.cwd()

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root)

  return {
    base: env.VITE_BASE_PATH,
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
      Unocss({ configFile: './uno.config.ts' }),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.md$/],
        imports: ['vue', 'vue-i18n', 'pinia', 'uni-app'],
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
        // 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        // fix修复pinia中使用vue-demi报错问题
        'vue-demi': 'vue-demi/lib/index.cjs'
      }
    },
    define: {
      'process.env': process.env
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
      include: ['@uni-helper/uni-use', '@vueuse/core', 'lodash-es']
    }
  }
})
