import basicPreset from '@bundle-preset/vite-basic'
import vue from '@vitejs/plugin-vue'
import { mergeConfig } from 'vite'
import type { ConfigEnv, Plugin, UserConfig } from 'vite'
import { getAutoImportOptions } from './autoImport'
import { getComponentsOptions } from './components'
import type { Options } from './types'

export const presetConfig = async (env: ConfigEnv, options: Options = {}) => {
  const isBuild = env.command === 'build'

  const basic = await basicPreset(env, {
    autoImport: getAutoImportOptions(options.autoImport),
  })
  const config: UserConfig = {
    plugins: [],
  }

  const vuePlugin = vue({
    include: [/\.vue$/, /\.vue\?vue/],
    reactivityTransform: true,
    ...(options.vue || {}),
  })

  if (options.vueMacros) {
    // @ts-expect-error failed to resolve types
    const { default: VueMacros } = await import('unplugin-vue-macros/vite')
    let jsxPlugin: Plugin | undefined
    if (options.vueJsx) {
      const { default: vueJsx } = await import('@vitejs/plugin-vue-jsx')
      jsxPlugin = vueJsx(options.vueJsx === true ? undefined : options.vueJsx)
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
    if (options.vueJsx) {
      const { default: vueJsx } = await import('@vitejs/plugin-vue-jsx')
      config.plugins!.push(
        vueJsx(options.vueJsx === true ? undefined : options.vueJsx),
      )
    }
  }

  if (options.components !== false) {
    const { default: Components } = await import('unplugin-vue-components/vite')
    config.plugins!.push(Components(getComponentsOptions(options.components)))
  }

  if (options.vueDevtools !== false && !isBuild) {
    const { default: Devtools } = await import('vite-plugin-vue-devtools')
    config.plugins!.push(Devtools())
  }

  return mergeConfig(basic, config)
}
