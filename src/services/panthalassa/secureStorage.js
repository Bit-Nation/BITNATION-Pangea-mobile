//@flow

/**
 * This is an implementation of the secure storage used by Panthalassa.
 */

import SInfo from 'react-native-sensitive-info';
import {SecureStorage} from 'BITNATION-Panthalassa/src/specification/secureStorageInterface';

const sSImplementation:SecureStorage = {
    set: (key:string, value:any) : Promise<void> => new Promise((res, rej) => SInfo.setItem(key, value, {})
        .then(_ => res())
        .catch(rej)
    ),
    get: (key:string) => SInfo.getItem(key),
    has: (key:string) => new Promise((res, rej) => SInfo.getItem(key)
        .then(value => {

            //Using if for exact comparison

            if(value === '' || value === null || value === undefined){
                return res(false)
            }

            if('string' === typeof value || 'number' === typeof value){
                return res(true);
            }

            rej(new Error(`Couldn't handle type: '${typeof value}'`));

        })
        .catch(error => rej(error))
    ),
    remove: (key:string) => SInfo.deleteItem(key),
    fetchItems: (filter: (key:string, value:any) => boolean) : Promise<Array<{key:string, value:any}>> => new Promise((res, rej) => {

        SInfo.getAllItems()
            .then(items => res(items.filter(filter)))
            .catch(rej);

    }),
    destroyStorage: () => new Promise((res, rej) => rej(new Error("This is not implemented")))
};

export default sSImplementation;
