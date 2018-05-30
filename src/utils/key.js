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
