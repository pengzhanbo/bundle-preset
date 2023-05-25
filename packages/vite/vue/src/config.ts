import basicPreset from '@bundle-preset/vite-basic'
import vue from '@vitejs/plugin-vue'
import { mergeConfig } from 'vite'
import type { Plugin, UserConfig } from 'vite'
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

  const vuePlugin = vue({
    include: [/\.vue$/, /\.vue\?vue/],
    reactivityTransform: true,
    ...(options.vue || {}),
  })

  if (options.vueMacros !== false) {
    // @ts-expect-error failed to resolve types
    const { default: VueMacros } = await import('unplugin-vue-macros/vite')
    let jsxPlugin: Plugin | undefined
    if (options.vueJsx !== false) {
      const { default: vueJsx } = await import('@vitejs/plugin-vue-jsx')
      jsxPlugin = vueJsx(options.vueJsx)
    }
    config.plugins!.push(
      VueMacros({
        ...options.vueMacros,
        plugin: {
          vue: vuePlugin,
          jsx: jsxPlugin,
        },
      }),
    )
  } else {
    config.plugins!.push(vuePlugin)
    if (options.vueJsx !== false) {
      const { default: vueJsx } = await import('@vitejs/plugin-vue-jsx')
      config.plugins!.push(vueJsx(options.vueJsx))
    }
  }

  if (options.components !== false) {
    const { default: Components } = await import('unplugin-vue-components/vite')
    config.plugins!.push(Components(getComponentsOptions(options.components)))
  }

  if (options.vueDevtools !== false) {
    const { default: Devtools } = await import('vite-plugin-vue-devtools')
    config.plugins!.push(Devtools())
  }

  return mergeConfig(basic, config)
}
