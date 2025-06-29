export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: string[]
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  ) as Omit<T, K>;
}
