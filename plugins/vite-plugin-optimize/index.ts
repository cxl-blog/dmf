import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import debug from 'debug'
import type { Plugin, UserConfig } from 'vite'
import fs from 'fs-extra'

let resolve: (...args: string[]) => void
// 覆写console.log 处理vite控制台输出信息
const log = console.log
console.log = function (...args) {
  resolve?.(...args)
  log(...args)
}

export type OptimizeOptions = {
  /**
   * milliseconds to wait before waiting this package.json file
   * @default 1000
   */
  delay?: number
  filter?: (includeMode: string) => boolean
}

export type PkgOptions = {
  /**
   * @default './package.json'
   */
  packageJsonPath?: string
  /**
   * @default 'viteConfig'
   */
  field?: string
}

interface VitePluginPkgConfigPlugin extends Plugin {
  api: {
    options: {
      packageJsonPath: string
      field: string
    }
  }
}

function VitePluginPkgConfig({
  packageJsonPath = join(process.cwd(), 'package.json'),
  field = 'viteConfig'
}: PkgOptions = {}): Plugin {
  return {
    name: 'vite-plugin-pkg-config',
    async config() {
      if (!existsSync(packageJsonPath)) {
        debug('package.json not found at %s', packageJsonPath)
        return
      }

      debug('loading package.json at %s', packageJsonPath)

      try {
        const packageJson: Record<string, any> = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
        const extend: UserConfig = packageJson[field]

        if (!extend) {
          debug('not %s field found in package.json, skip', field)
        }

        debug('merging config with %o', extend)

        return extend
      } catch (error) {
        debug('parse error: %0', error)
        debug('error on loading package.json at %s, skip: %o', packageJsonPath, error)
      }
    },
    api: {
      options: {
        packageJsonPath,
        field
      }
    }
  }
}

function VitePluginOptimize({ delay = 1000, filter = () => true }: OptimizeOptions = {}): Plugin {
  return {
    name: 'vite-plugin-optimize',
    apply: 'serve',
    configureServer(server) {
      const vitePluginPkgConfig = server.config.plugins.find(
        plugin => plugin.name === 'vite-plugin-pkg-config'
      ) as VitePluginPkgConfigPlugin

      const pkgConfig = vitePluginPkgConfig?.api.options

      if (!pkgConfig) {
        throw new Error('should be used plugin [vite-plugin-pkg-config], Did you use it?')
      }

      const { packageJsonPath, field } = pkgConfig
      const optimizationInclude = server.config.optimizeDeps.include || []
      let newDeps: string[] = []
      let timer: NodeJS.Timeout

      resolve = function update(...args: string[]) {
        const str = args[0]

        if (!str?.includes?.('new dependencies optimized:')) {
          return
        }

        const data = str
          .replace(/.*new dependencies optimized:/, '')
          .replace('\x1B[33m', '')
          .replace('\x1B[32m\x1B[39m', '')
          .trim()
          .split(', ')
        newDeps = data.filter(dep => !!dep && !optimizationInclude.includes(dep)).filter(filter)

        debug('newDeps', newDeps)
        clearTimeout(timer)
        timer = setTimeout(write, delay)

        async function write() {
          if (!newDeps.length) {
            return
          }

          debug(`Writing to ${packageJsonPath}`)
          const pkg = await fs.readJSON(packageJsonPath)
          pkg[field] ||= {}
          const extend = pkg[field]
          extend.optimizeDeps ||= {}
          extend.optimizeDeps.include = [
            ...new Set([...(extend.optimizeDeps.include || []), ...newDeps])
          ]
          extend.optimizeDeps.include.sort()
          server.config.optimizeDeps.include = [...extend.optimizeDeps.include]

          await fs.writeJSON(packageJsonPath, pkg, { spaces: 2 })

          debug('written')
        }
      }
    }
  }
}

export { VitePluginPkgConfig, VitePluginOptimize }
