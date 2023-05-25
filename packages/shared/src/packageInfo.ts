import fs from 'node:fs'
import path from 'node:path'

export interface GetPackageInfoOptions {
  cwd?: string
}

export function getLocalPackageInfo({
  cwd = process.cwd(),
}: GetPackageInfoOptions = {}) {
  let pkg: Record<string, any> = {}
  try {
    const packageJson = fs.readFileSync(path.join(cwd, 'package.json'))
    pkg = JSON.parse(packageJson.toString())
  } catch {}

  const dependencies = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ]

  const hasDependency = (name: string) => dependencies.includes(name)

  return {
    packageInfo: pkg,
    hasDependency,
  }
}
