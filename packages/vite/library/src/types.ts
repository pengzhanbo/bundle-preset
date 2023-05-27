import { type Options as BasicPresetOptions } from '@bundle-preset/vite-basic'

export interface Options extends BasicPresetOptions {
  name?: string
  entry?: string
  formats?: ('es' | 'cjs' | 'iife' | 'umd')[]
}

export type {}
