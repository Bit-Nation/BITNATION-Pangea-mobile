// @flow

import _ from 'lodash';
import type { WalletType } from '../types/Wallet';

/**
 * @desc Gets wallet by address from array of wallets.
 * @param {WalletType[]} wallets Array of wallets.
 * @param {string} currency Currency of wallet to be got.
 * @return {?WalletType} Wallet or no if there is no wallet with that address.
 */
export function resolveWallet(wallets: Array<WalletType>, currency: string): WalletType | null {
  const resolved = _.find(wallets, wallet => wallet.currency === currency);
  return resolved === undefined ? null : resolved;
}

/**
 * @desc Gets wallet index by address in array of wallets.
 * @param {WalletType[]} wallets Array of wallets.
 * @param {string} address Address of wallet to be got.
 * @return {number} Index of wallet or null if there is no wallet with that address.
 */
export function getWalletIndex(wallets: Array<WalletType>, address: string): number | null {
  const index = _.findIndex(wallets, wallet => wallet.ethAddress === address);
  return index === -1 ? null : index;
}

/**
 * @desc Converts wallet from database representation.
 * @param {Object} wallets Dictionary that contains addresses as keys and private keys as values.
 * @return {WalletType[]} Array of converted wallets.
 */
export function convertWallets(wallets: Array<{value: string, key: string}>): Array<WalletType> {
  const walletsArray = [];
  wallets.forEach((value, key) =>
    walletsArray.push({
      key,
      value,
    }));

  console.log('----> Wallets Array: ', walletsArray);

  return _.map(walletsArray, wallet => ({
    ethAddress: wallet.key,
    currency: 'ETH',
    balance: undefined,
    name: 'Ethereum',
  }));
}
