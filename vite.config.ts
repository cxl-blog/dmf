import { URL, fileURLToPath } from 'node:url'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import Unocss from 'unocss/vite'
import viteImagemin from 'vite-plugin-imagemin'
import visualizer from 'rollup-plugin-visualizer'
import { VitePluginOptimize, VitePluginPkgConfig } from './plugins/vite-plugin-optimize'

let PROXY_ENV = 'dev'

const targetMaps = {
  dev: {
    target: 'https://springboot-5thz-84626-6-1322169562.sh.run.tcloudbase.com'
  }
}

if (process.env.npm_lifecycle_event && process.env.npm_lifecycle_event.match(/:(.+)/)) {
  PROXY_ENV = process.env.npm_lifecycle_event.split(':')?.[0] || ''
}

const root = process.cwd()

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root)

  return {
    base: env.VITE_BASE_PATH,
    build: {
      assetsInlineLimit: 4096
    },
    plugins: [
      UniLayouts(),
      UniPages(),
      uni({
        vueOptions: {
          include: [/\.vue$/, /\.md$/],
          script: {
            defineModel: true
          }
        },
        vueJsxOptions: true
      }),
      UniManifest(),
      Unocss({ configFile: './uno.config.ts' }),
      VitePluginPkgConfig(),
      VitePluginOptimize(),
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
      }),
      visualizer({ open: true }),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 20
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox'
            },
            {
              name: 'removeEmptyAttrs',
              active: false
            }
          ]
        }
      })
    ],
    assetsInclude: ['./src/static/**'],
    esbuild: {
      // 微信调试
      // pure: ['console.log'],
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
