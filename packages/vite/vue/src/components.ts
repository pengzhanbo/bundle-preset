import { isArray, unique } from '@bundle-preset/shared'
import { isPackageExists } from 'local-pkg'
import {
  ElementPlusResolver,
  LayuiVueResolver,
  NaiveUiResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers'
import { type Options as ComponentsOptions } from 'unplugin-vue-components/types'
import { type Options } from './types'

export const getComponentsOptions = (
  options: Options['components'] = {},
): ComponentsOptions | undefined => {
  if (options === false) return undefined
  const resolvers = isArray(options.resolvers)
    ? options.resolvers
    : options.resolvers
    ? [options.resolvers]
    : []

  isPackageExists('naive-ui') && resolvers.push(NaiveUiResolver())
  isPackageExists('element-plus') &&
    resolvers.push(
      ElementPlusResolver({
        importStyle: isPackageExists('sass') ? 'sass' : 'css',
      }),
    )
  isPackageExists('vant') &&
    resolvers.push(
      VantResolver({ importStyle: isPackageExists('less') ? 'less' : 'css' }),
    )
  isPackageExists('layui-vue') && resolvers.push(LayuiVueResolver())

  return {
    extensions: ['vue'],
    include: [/\.vue$/, /\/vue\?vue/],
    dts: 'src/components.d.ts',
    dirs: ['src/components'],
    ...options,
    resolvers: unique(resolvers),
  }
}
