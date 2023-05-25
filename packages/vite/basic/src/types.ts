import { type Options as AutoImportOptions } from 'unplugin-auto-import/types'
import { type MockServerPluginOptions } from 'vite-plugin-mock-dev-server'
import { type Options as PwaOptions } from 'vite-plugin-pwa'

export interface Options {
  autoImport?: false | AutoImportOptions
  mockDevServerOptions?: false | MockServerPluginOptions
  pwaOptions?: PwaOptions
}

export type { AutoImportOptions, MockServerPluginOptions, PwaOptions }
