/* eslint-disable import/prefer-default-export */
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

/**
 * @desc Convert HEX string into Base64 string
 * @param {string} hexstring hex string to be converted
 * @return {string} Result Base64 string
 */
export function hexToBase64(hexstring: string): string {
  return btoa(hexstring.match(/\w{2}/g).map(a => String.fromCharCode(parseInt(a, 16))).join(''));
}

/**
 * @desc Convert Base64 string into Hex string
 * @param {string} str Base64 string to be converted
 * @return {string} Result Hex string
 */
export function base64ToHex(str: string): string {
  for (let i = 0, bin = atob(str.replace(/[ \r\n]+$/, '')), hex = []; i < bin.length; i++) {
    let tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = `0${tmp}`;
    hex[hex.length] = tmp;
  }
  return hex.join('');
}

/**
 * @desc Convert byte array into Hex string
 * @param {byte[]} byteArray byte array to be converted
 * @return {string} Result Hex string
 */
export function byteToHexString(byteArray: byte[]): string {
  return Array.from(byteArray, (byte) => {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}
