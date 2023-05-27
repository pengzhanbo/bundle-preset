import basicPreset from '@bundle-preset/vite-basic'
import React from '@vitejs/plugin-react'
import { mergeConfig } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import type { Options } from './types'

export const presetConfig = async (env: ConfigEnv, options: Options = {}) => {
  // const isBuild = env.command === 'build'
  const basic = await basicPreset(env)

  const config: UserConfig = {
    plugins: [React(options.react)],
  }

  return mergeConfig(basic, config)
}
