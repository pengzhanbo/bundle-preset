import basicPreset from '@bundle-preset/vite-basic'
import { mergeConfig } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import type { Options } from './types'

export const presetConfig = async (env: ConfigEnv, _options: Options = {}) => {
  // const isBuild = env.command === 'build'
  const basic = await basicPreset(env, {
    autoImport: false,
  })

  const config: UserConfig = {
    plugins: [],
  }

  return mergeConfig(basic, config)
}
