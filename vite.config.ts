import { URL, fileURLToPath } from 'node:url'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

let PROXY_ENV = 'dev'

const targetMaps = {
  dev: {
    target: 'https://sprintboot-0l81-77914-5-1322066261.sh.run.tcloudbase.com'
  }
}

if (process.env.npm_lifecycle_event && process.env.npm_lifecycle_event.match(/:(.+)/)) {
  PROXY_ENV = process.env.npm_lifecycle_event.match(/:(.+)/)?.[0] || ''
}

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
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      'process.env': process.env
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
          sassOptions: {
            // 输出风格为expanded，解决Unicode字符压缩的时候会被置为乱码问题
            outputStyle: 'expanded'
          }
        }
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
      },
      proxy: {
        [`${env.VITE_API_BASE_PATH}`]: {
          ws: true,
          changeOrigin: true,
          secure: true,
          rewrite: (path: string) => {
            const regexp = new RegExp(`^${env.VITE_API_BASE_PATH}`)
            return env.VITE_API_BASE_PATH !== '/' ? path.replace(regexp, '') : path
          },
          ...(targetMaps[PROXY_ENV] || {})
        }
      }
    },
    optimizeDeps: {
      include: ['@uni-helper/uni-use', '@vueuse/core', 'lodash-es']
    }
  }
})
