// @flow

import _ from 'lodash';
import type { Mnemonic } from '../types/Mnemonic';

/**
 * @desc Function to convert mnemonic from array to string.
 * @param {Mnemonic} mnemonic Mnemonic array to convert.
 * @return {string} Converted mnemonic string.
 */
export function compressMnemonic(mnemonic: Mnemonic): string {
  return _.join(mnemonic, ' ');
}

/**
 * @desc Function to convert mnemonic from string to array.
 * @param {string} mnemonicString Mnemonic string to convert.
 * @return {Mnemonic} Converted mnemonic array.
 */
export function decompressMnemonic(mnemonicString: string): Mnemonic {
  return mnemonicString.split(' ');
}

/**
 * @desc Normalizes ethereum private key to look like '0x...'
 * @param {string} ethPrivateKey Private key to normalize
 * @return {string} Normalized private key
 */
export function normalizeEthPrivateKey(ethPrivateKey: string): string {
  if (ethPrivateKey.startsWith('0x')) {
    return ethPrivateKey;
  }

  return `0x${ethPrivateKey}`;
}


/* eslint-disable */
/**
 * @desc Convert byte array into Hex string
 * @param {byte[]} byteArray byte array to be converted
 * @return {string} Result Hex string
 */
export function byteToHexString(byteArray: Array<number>): string {
  return Array.from(byteArray, (byte) => {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}
