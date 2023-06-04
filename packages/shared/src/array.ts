import { isArray } from './is'

export const ensureArray = <T>(thing: T[] | T | undefined | null): T[] => {
  if (isArray(thing)) return thing
  if (thing === null || thing === undefined) return []
  return [thing as T]
}
