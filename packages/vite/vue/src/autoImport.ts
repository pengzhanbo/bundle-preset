import { isArray, unique } from '@bundle-preset/shared'
import {
  type AutoImportOptions,
  type Options as BasicPresetOptions,
} from '@bundle-preset/vite-basic'
import { isPackageExists } from 'local-pkg'
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
  const imports = isArray(autoImport.imports)
    ? autoImport.imports
    : autoImport.imports
    ? [autoImport.imports]
    : []

  imports.push('vue', 'vue/macros')

  vueImports.forEach((pkg) => {
    isPackageExists(pkg as string) && imports.push(pkg)
  })

  isPackageExists('naive-ui') &&
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

  isPackageExists('element-plus') && resolvers.push(ElementPlusResolver())

  const options: BasicPresetOptions['autoImport'] = {
    vueTemplate: true,
    dirs: ['src/store', 'src/composables', 'src/hooks'],
    ...autoImport,
    imports: unique(imports),
    resolvers: unique(resolvers),
  }

  return options
}
