import fs from 'node:fs'
import path from 'node:path'
import { getLocalPackageInfo, isArray, unique } from '@bundle-preset/shared'
import {
  type AutoImportOptions,
  type Options as BasicPresetOptions,
} from '@bundle-preset/vite-basic'

const vueImports: AutoImportOptions['imports'] = [
  'ahooks',
  'mobx',
  'mobx-react-lite',
  'recoil',
  'react-router-dom',
  'react-router',
]

export const getAutoImportOptions = (
  autoImport: BasicPresetOptions['autoImport'] = {},
) => {
  if (autoImport === false) return false
  const { hasDependency } = getLocalPackageInfo()
  const imports = isArray(autoImport.imports)
    ? autoImport.imports
    : autoImport.imports
    ? [autoImport.imports]
    : []

  imports.push('react')

  vueImports.forEach((pkg) => {
    hasDependency(pkg as string) && imports.push(pkg)
  })

  const resolvers = isArray(autoImport.resolvers)
    ? autoImport.resolvers
    : autoImport.resolvers
    ? [autoImport.resolvers]
    : []

  const dirs = ['src/store', 'src/stores', 'src/hooks'].filter((dir) =>
    fs.existsSync(path.join(process.cwd(), dir)),
  )

  const options: BasicPresetOptions['autoImport'] = {
    vueTemplate: true,
    dirs: unique(dirs),
    ...autoImport,
    imports: unique(imports),
    resolvers: unique(resolvers),
  }

  return options
}
