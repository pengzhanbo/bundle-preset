import path from 'node:path'
import { getLocalPackageInfo } from '@bundle-preset/shared'
import type { ConfigEnv, UserConfig } from 'vite'
import type { Options } from './types'

export const presetConfig = async (env: ConfigEnv, options: Options = {}) => {
  // const isBuild = env.command === 'build'
  const { autoImport = {}, mockDevServerOptions } = options
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

  if (hasDependency('typescript')) {
    const { default: tsconfigPaths } = await import('vite-tsconfig-paths')
    config.plugins!.push(tsconfigPaths())
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

  if (mockDevServerOptions !== false) {
    const { default: mockDevServer } = await import(
      'vite-plugin-mock-dev-server'
    )
    config.plugins!.push(mockDevServer(mockDevServerOptions))
  }

  if (hasDependency('unocss')) {
    const { default: unocss } = await import('unocss/vite')
    config.plugins!.push(unocss())
  }

  if (options.pwaOptions) {
    const { VitePWA } = await import('vite-plugin-pwa')
    config.plugins!.push(VitePWA(options.pwaOptions))
  }

  return config
}
