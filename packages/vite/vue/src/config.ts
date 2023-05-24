import basicPreset from '@bundle-preset/vite-basic'
import vue from '@vitejs/plugin-vue'
import { type UserConfig, mergeConfig } from 'vite'
import { getAutoImportOptions } from './autoImport'
import { getComponentsOptions } from './components'
import type { Options } from './types'

export const presetConfig = async (options: Options = {}) => {
  const basic = await basicPreset({
    autoImport: getAutoImportOptions(options.autoImport),
  })
  const config: UserConfig = {
    plugins: [
      vue({
        include: [/\.vue$/, /\.vue\?vue/],
        reactivityTransform: true,
        ...(options.vue || {}),
      }),
    ],
  }

  if (options.vueJsx !== false) {
    const { default: vueJsx } = await import('@vitejs/plugin-vue-jsx')
    config.plugins!.push(vueJsx(options.vueJsx))
  }

  if (options.components !== false) {
    const { default: Components } = await import('unplugin-vue-components/vite')
    config.plugins!.push(Components(getComponentsOptions(options.components)))
  }

  return mergeConfig(basic, config)
}
