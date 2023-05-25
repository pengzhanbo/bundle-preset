import { type Options as BasicPresetOptions } from '@bundle-preset/vite-basic'
import { type Options as VueOptions } from '@vitejs/plugin-vue'
import { type Options as VueJsxOptions } from '@vitejs/plugin-vue-jsx'
import { type Options as ComponentsOptions } from 'unplugin-vue-components/types'
import { type Options as VueMacrosOptions } from 'unplugin-vue-macros'

export interface Options extends BasicPresetOptions {
  vue?: VueOptions
  vueJsx?: true | VueJsxOptions
  components?: false | ComponentsOptions
  vueMacros?: VueMacrosOptions
  vueDevtools?: false
}

export type {
  BasicPresetOptions,
  VueJsxOptions,
  VueMacrosOptions,
  VueOptions,
  ComponentsOptions,
}
