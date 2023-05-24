import { type Options as AutoImportOptions } from 'unplugin-auto-import/types'
import { type MockServerPluginOptions } from 'vite-plugin-mock-dev-server'

export interface Options {
  autoImport?: false | AutoImportOptions
  mockDevServerOptions?: false | MockServerPluginOptions
}

export type { AutoImportOptions, MockServerPluginOptions }
