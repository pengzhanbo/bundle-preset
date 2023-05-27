import path from 'node:path'
import { getLocalPackageInfo } from '@bundle-preset/shared'
import basicPreset from '@bundle-preset/vite-basic'
import { mergeConfig } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import type { Options } from './types'

export const presetConfig = async (env: ConfigEnv, options: Options = {}) => {
  // const isBuild = env.command === 'build'
  const { packageInfo } = getLocalPackageInfo()

  const basic = await basicPreset(env, {
    autoImport: false,
    visualizer: false,
    mockDevServer: false,
    unoCSS: false,
    ...options,
  })

  const { name = '', type } = packageInfo as {
    name: string
    type: 'module' | 'commonjs'
  }
  const getPackageName = () => {
    if (name.startsWith('@')) {
      const [, packageName] = name.split('/')
      return packageName
    }
    return name
  }

  const libraryName = options.name || getPackageName()

  const libraryNameCase = libraryName.replace(/-./, (c) =>
    c[1].toLocaleUpperCase(),
  )

  const cjsExt = type === 'commonjs' ? '.js' : '.cjs'
  const esExt = type === 'commonjs' ? '.mjs' : '.js'

  const fileName: Record<string, string> = {
    es: `${libraryName}${esExt}`,
    cjs: `${libraryName}${cjsExt}`,
    iife: `${libraryName}.iife${cjsExt}`,
    umd: `${libraryName}.umd${cjsExt}`,
  }

  const config: UserConfig = {
    plugins: [],
    build: {
      lib: {
        entry: options.entry || path.resolve(process.cwd(), 'src/index.ts'),
        name: libraryNameCase,
        formats: options.formats || ['es', 'cjs', 'iife'],
        fileName: (format) => fileName[format],
      },
    },
    server: { open: false },
  }

  return mergeConfig(basic, config)
}
