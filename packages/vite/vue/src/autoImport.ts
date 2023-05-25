import fs from 'node:fs'
import path from 'node:path'
import { getLocalPackageInfo, isArray, unique } from '@bundle-preset/shared'
import {
  type AutoImportOptions,
  type Options as BasicPresetOptions,
} from '@bundle-preset/vite-basic'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const vueImports: AutoImportOptions['imports'] = [
  'vue-router',
  'vue-i18n',
  '@vueuse/core',
  '@vueuse/head',
  '@vueuse/math',
  'vue-demi',
  'pinia',
]

export const getAutoImportOptions = (
  autoImport: BasicPresetOptions['autoImport'] = {},
): BasicPresetOptions['autoImport'] => {
  if (autoImport === false) return false
  const { hasDependency } = getLocalPackageInfo()
  const imports = isArray(autoImport.imports)
    ? autoImport.imports
    : autoImport.imports
    ? [autoImport.imports]
    : []

  imports.push('vue', 'vue/macros')

  vueImports.forEach((pkg) => {
    hasDependency(pkg as string) && imports.push(pkg)
  })

  hasDependency('naive-ui') &&
    imports.push({
      'naive-ui': [
        'useDialog',
        'useMessage',
        'useNotification',
        'useLoadingBar',
      ],
    })

  const resolvers = isArray(autoImport.resolvers)
    ? autoImport.resolvers
    : autoImport.resolvers
    ? [autoImport.resolvers]
    : []

  hasDependency('element-plus') && resolvers.push(ElementPlusResolver())

  const dirs = [
    'src/store',
    'src/stores',
    'src/composables',
    'src/hooks',
  ].filter((dir) => fs.existsSync(path.join(process.cwd(), dir)))

  const options: BasicPresetOptions['autoImport'] = {
    vueTemplate: true,
    dirs: unique(dirs),
    ...autoImport,
    imports: unique(imports),
    resolvers: unique(resolvers),
  }

  return options
}
