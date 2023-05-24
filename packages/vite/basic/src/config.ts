import path from 'node:path'
import type { UserConfig } from 'vite'
import type { Options } from './types'

export const presetConfig = async (options: Options = {}) => {
  const { autoImport = {}, mockDevServerOptions } = options

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

  return config
}
