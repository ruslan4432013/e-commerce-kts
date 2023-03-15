interface ObjectWithKey {
  [key: string]: any;
}

export function filterUniqueByKey<T extends ObjectWithKey>(
  arr: T[],
  key: keyof T
): T[] {
  const uniqueValues = new Set<T[keyof T]>();
  return arr.filter((obj) => {
    if (uniqueValues.has(obj[key])) {
      return false;
    }

    uniqueValues.add(obj[key]);
    return true;
  });
}
