import { type PluginVisualizerOptions as VisualizerOptions } from 'rollup-plugin-visualizer'
import { type VitePluginConfig as UnocssOptions } from 'unocss/vite'
import { type Options as AutoImportOptions } from 'unplugin-auto-import/types'
import { type MockServerPluginOptions } from 'vite-plugin-mock-dev-server'
import { type Options as PwaOptions } from 'vite-plugin-pwa'
import { type PluginOptions as TsconfigPathOptions } from 'vite-tsconfig-paths'

export interface Options {
  tsconfigPaths?: false | TsconfigPathOptions
  autoImport?: false | AutoImportOptions
  mockDevServer?: false | MockServerPluginOptions
  pwa?: PwaOptions
  unoCSS?: false | UnocssOptions
  visualizer?: false | VisualizerOptions
}

export {
  type AutoImportOptions,
  type MockServerPluginOptions,
  type PwaOptions,
  type UnocssOptions,
}
