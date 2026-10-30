/** Sanity requires a unique `_key` on every object inside an array. */
export function withKeys<T>(value: T, path = "k"): T {
  if (Array.isArray(value)) {
    return value.map((item, i) => {
      const keyed = withKeys(item, `${path}${i}`);
      return keyed && typeof keyed === "object" && !("_key" in keyed) ? { _key: `${path}${i}`, ...keyed } : keyed;
    }) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withKeys(v, `${path}${k[0]}`)])) as T;
  }
  return value;
}
