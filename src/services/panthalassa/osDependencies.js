// @flow

// Make buffer available
if (!global.Buffer) {
  global.Buffer = require('buffer/').Buffer;
}

import { NativeModules } from 'react-native';

const { RNRandomBytes } = NativeModules;

import { OsDependenciesInterface, Crypto } from 'BITNATION-Pangea-libs/src/specification/osDependencies';

const cryptoImpl:Crypto = {

  randomBytes: (length:number) => new Promise((res, rej) => {
    RNRandomBytes.randomBytes(length, (err, base64String) => {
      if (err) {
        return rej(err);
      }

      res(Buffer.from(base64String, 'base64').toString('hex'));
    });
  }),

};

/**
 * @desc This module provides some functionality for Panthalassa such as crypto functions
 * @alias osDependencies
 * @type {{crypto: Crypto}}
 */
const osDepsImpl:OsDependenciesInterface = {
  crypto: cryptoImpl,
};

export default osDepsImpl;
