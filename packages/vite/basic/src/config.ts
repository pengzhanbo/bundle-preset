import path from 'node:path'
import {
  fileExits,
  getLocalPackageInfo,
  unocssConfigFiles,
} from '@bundle-preset/shared'
import type { ConfigEnv, Plugin, UserConfig } from 'vite'
import type { Options } from './types'

export const presetConfig = async (env: ConfigEnv, options: Options = {}) => {
  const isBuild = env.command === 'build'
  const { tsconfigPaths, autoImport = {}, mockDevServer, pwa, unoCSS } = options
  const { hasDependency } = getLocalPackageInfo()

  const config: UserConfig = {
    plugins: [],
    resolve: {
      alias: {
        '~/': path.resolve(process.cwd(), 'src'),
      },
    },
    server: {
      open: true,
      host: '0.0.0.0',
    },
  }

  if (tsconfigPaths !== false && hasDependency('typescript')) {
    const { default: TsconfigPaths } = await import('vite-tsconfig-paths')
    config.plugins!.push(TsconfigPaths(tsconfigPaths))
  }

  if (autoImport !== false) {
    const { default: AutoImport } = await import('unplugin-auto-import/vite')
    config.plugins!.push(
      AutoImport({
        dts: 'src/auto-imports.d.ts',
        ...autoImport,
      }),
    )
  }

  if (mockDevServer !== false) {
    const { default: MockDevServer } = await import(
      'vite-plugin-mock-dev-server'
    )
    config.plugins!.push(MockDevServer(mockDevServer))
  }

  if (unoCSS !== false && hasDependency('unocss')) {
    const files = unoCSS?.configFile
      ? [unoCSS.configFile, ...unocssConfigFiles]
      : unocssConfigFiles
    if (fileExits(files)) {
      const { default: Unocss } = await import('unocss/vite')
      config.plugins!.push(Unocss(unoCSS))
    }
  }

  if (pwa) {
    const { VitePWA } = await import('vite-plugin-pwa')
    config.plugins!.push(VitePWA(options.pwa))
  }

  if (options.visualizer !== false && isBuild) {
    const { default: Visualizer } = await import('rollup-plugin-visualizer')
    config.plugins!.push(
      Visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
        ...options.visualizer,
      }) as Plugin,
    )
  }

  return config
}
