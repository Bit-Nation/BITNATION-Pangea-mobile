// @flow

import { BigNumber } from 'bignumber.js';

import i18n from '../global/i18n';
import type { WalletType } from '../types/Wallet';

/**
 * @desc Round to 5 digits
 * @param {string} eth String value of eth amount to be rounded.
 * @return {string} Rounded string value that represents eth amount to 5 digits
 */
export function roundEth(eth: string): string {
  const ethBn = new BigNumber(eth);

  return ethBn.round(5).toString(10);
}

/**
 * @desc Provide string for wallet balance even if it is undefined
 * @param {object} wallet Wallet object
 * @param {object} currency Current symbol after amount, default is "ETH"
 * @param {object} successfulSuffix Suffix to add if balance is present
 * @return {string} Formatted balance + successful suffix if balance defined,
 * corresponding string if not defined.
 */
export function prettyWalletBalance(wallet: WalletType) {
  // currency: ?CurrencyType,
  // successfulSuffix: ?string,
  // const suffix = successfulSuffix || '';
  if (wallet.balance !== null) {
    return `${wallet.balance} ${wallet.currency}`;
    // return `${roundEth(wallet.balance)} ${currency || ''}${suffix}`;
  }
  return !wallet.synchronizationError ? i18n.t('common.updating') : i18n.t('common.updateFailed');
}

/**
 * @desc Shorten ethereum address for compact displaying.
 * @example
 * const shortAddr = shortEthAddress("0x999d1ce359692aebc26cd969a31d47d150128600")
 *
 * // Will log: 0x999...28600
 * console.log(shortAddr);
 * @param {string} address Address to be shortened.
 * @return {string} Short version of address.
 */
export function shortEthAddress(address: string): string {
  return `${address.substring(0, 5)}...${address.slice(-5)}`;
}
