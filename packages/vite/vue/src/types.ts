import { type Options as BasicPresetOptions } from '@bundle-preset/vite-basic'
import { type Options as VueOptions } from '@vitejs/plugin-vue'
import { type Options as VueJsxOptions } from '@vitejs/plugin-vue-jsx'
import { type Options as ComponentsOptions } from 'unplugin-vue-components/types'

export interface Options extends BasicPresetOptions {
  vue?: VueOptions
  vueJsx?: false | VueJsxOptions
  components?: false | ComponentsOptions
}
