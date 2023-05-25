import { presetConfig } from '@bundle-preset/vite-vue'
import { defineConfig } from 'vite'

export default defineConfig(async (env) => await presetConfig(env))
