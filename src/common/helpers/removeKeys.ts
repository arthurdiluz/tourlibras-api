/**
 * Exclude keys from an object
 * @param object Object you want to remove a key from
 * @param keys Keys to be removed from object
 * @returns Object with omitted keys
 */

export function removeKeys<ObjectRef, Key extends keyof ObjectRef>(
  object: ObjectRef,
  keys: Key[],
): Omit<ObjectRef, Key> {
  for (const key of keys) {
    if (object.hasOwnProperty(key)) {
      delete object[key];
    }
  }
  return object;
}
