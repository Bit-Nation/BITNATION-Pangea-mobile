// @flow

import SInfo from 'react-native-sensitive-info';
import { SecureStorageInterface } from 'BITNATION-Pangea-libs/src/specification/secureStorageInterface';

/**
 * @desc Implementation of the secure storage Panthalassa specification and is used to save sensitive data. You are unlikely to use this. It's required by Panthalassa modules.
 * @type {{set: function(string, any): Promise<any>, get: function(string), has: function(string): Promise<any>, remove: function(string): *, fetchItems: function(*): Promise<any>, destroyStorage: function(): Promise<any>}}
 * @alias secureStorage
 */
const sSImplementation:SecureStorageInterface = {
  set: (key:string, value:any) : Promise<void> => new Promise((res, rej) => SInfo.setItem(key, value, {})
    .then(_ => res())
    .catch(rej)),
  get: (key:string) => SInfo.getItem(key, {}),
  has: (key:string) => new Promise((res, rej) => SInfo.getItem(key, {})
    .then((value) => {
      // Using if for exact comparison

      if (value === '' || value === null || value === undefined) {
        return res(false);
      }

      if (typeof value === 'string' || typeof value === 'number') {
        return res(true);
      }

      rej(new Error(`Couldn't handle type: '${typeof value}'`));
    })
    .catch(error => rej(error))),
  remove: (key:string) => SInfo.deleteItem(key, {}),
  fetchItems: (filter: (key:string, value:any) => boolean) : Promise<{}> => new Promise((res, rej) => {
    SInfo
      .getAllItems({})
      .then((itemsArray) => {
        // @todo Remove that after issue fixed (https://github.com/mCodex/react-native-sensitive-info/issues/8)
        const isIOS = Array.isArray(itemsArray[0]);
        const filteredItems = {};

        if (isIOS) {
          const items = itemsArray[0];

          items
          // Convert array to key value objects
            .map(item => ({
              key: item.key,
              value: item.value,
            }))
          // Filter them based on provided filter
            .filter(object => filter(object.key, object.value))
          // Combine keys into one object
            .forEach(object => filteredItems[object.key] = object.value);
        } else {
          const items = itemsArray;

          Object
          // Convert to keys array
            .keys(items)
          // Filter them based on provided filter
            .filter(key => filter(key, items[key]))
          // Combine keys into one object
            .forEach(key => filteredItems[key] = items[key]);
        }

        res(filteredItems);
      })
      .catch(rej);
  }),
  destroyStorage: () => new Promise((res, rej) => rej(new Error('This is not implemented'))),
};

export default sSImplementation;
