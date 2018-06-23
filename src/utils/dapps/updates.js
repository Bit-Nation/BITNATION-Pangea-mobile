// @flow

/**
 * @desc Returns updated object by setting something to specific key path.
 * @param {Object} initialObject Initial object to be modified.
 * @param {string} keyPath Key path in form 'something.something2.etc'.
 * @param {any} value Value to be set.
 * @return {Object} Updated object.
 */
export function updatePartByKeyPath(initialObject: Object, keyPath: string, value: any): Object {
  console.log(keyPath);

  const indexOfDot = keyPath.indexOf('.');
  if (indexOfDot === -1) {
    return {
      ...initialObject,
      [keyPath]: value,
    };
  }

  const key = keyPath.substring(0, indexOfDot);
  const resultedObject = { ...initialObject };
  resultedObject[key] = updatePartByKeyPath(resultedObject[key] || {}, keyPath.substring(indexOfDot + 1), value);

  return resultedObject;
}
