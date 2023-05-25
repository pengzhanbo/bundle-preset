import { getLocalPackageInfo, isArray, unique } from '@bundle-preset/shared'
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

  const { hasDependency } = getLocalPackageInfo()

  const resolvers = isArray(options.resolvers)
    ? options.resolvers
    : options.resolvers
    ? [options.resolvers]
    : []

  hasDependency('naive-ui') && resolvers.push(NaiveUiResolver())
  hasDependency('element-plus') &&
    resolvers.push(
      ElementPlusResolver({
        importStyle: hasDependency('sass') ? 'sass' : 'css',
      }),
    )
  hasDependency('vant') &&
    resolvers.push(
      VantResolver({ importStyle: hasDependency('less') ? 'less' : 'css' }),
    )
  hasDependency('layui-vue') && resolvers.push(LayuiVueResolver())

  return {
    extensions: ['vue'],
    include: [/\.vue$/, /\/vue\?vue/],
    dts: 'src/components.d.ts',
    dirs: ['src/components'],
    ...options,
    resolvers: unique(resolvers),
  }
}
