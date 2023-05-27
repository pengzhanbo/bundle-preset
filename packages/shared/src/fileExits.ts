import fs from 'node:fs'
import path from 'node:path'
import { isArray } from './is'

export const fileExits = (files: string | string[], cwd?: string) => {
  cwd ??= process.cwd()
  if (isArray(files)) {
    return files.some((f) => fs.existsSync(path.join(cwd!, f)))
  }
  return fs.existsSync(path.join(cwd, files))
}
