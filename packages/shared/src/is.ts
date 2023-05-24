const checkType = (val: unknown): string =>
  Object.prototype.toString.call(val).slice(8, -1)

export const isArray = <T>(val: unknown): val is T[] => Array.isArray(val)

export const isPlainObject = (val: unknown): val is Record<string, unknown> =>
  checkType(val) === 'Object'

export const isEmptyObject = (val: unknown): boolean =>
  isPlainObject(val) && Object.keys(val).length === 0

export function isDefined<T>(value: T | undefined | null): value is T {
  return value != null
}

export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}
