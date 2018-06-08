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
 * @param {string} currency Currency of wallet to be got.
 * @return {number} Index of wallet or null if there is no wallet with that address.
 */
export function getWalletIndex(wallets: Array<WalletType>, address: string, currency: string = 'ETH'): number | null {
  const index = _.findIndex(wallets, wallet => wallet.ethAddress === address && wallet.currency === currency);
  return index === -1 ? null : index;
}
