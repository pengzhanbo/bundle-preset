import { type Options as BasicPresetOptions } from '@bundle-preset/vite-basic'
import { type Options as ReactOptions } from '@vitejs/plugin-react'

export interface Options extends BasicPresetOptions {
  react?: ReactOptions
}

export type { ReactOptions, BasicPresetOptions }
