import Strings from '../global/Strings';

const BN = require('bignumber.js');

/**
 * @desc Round to 5 digits
 * @param {string} eth Round string value that represents eth amount to 5 digits
 * @return {string}
 */
export function roundEth(eth:string) : string {

    const ethBn = new BN(eth);

    return ethBn.round(5).toString(10);

}

/**
 * @desc Provide string for wallet balance even if it is undefined
 * @param {object} wallet Wallet object
 * @param {object} successfulSuffix Suffix to add if balance is present
 * @return {string} Formatted balance + successful suffix if balance defined, corresponding string if not defined.
 */
export function prettyETHWalletBalance(wallet, successfulSuffix) {
  successfulSuffix = successfulSuffix || '';
  if (wallet.balance !== null && wallet.balance !== undefined) {
    return roundEth(wallet.balance) + ' ETH' + successfulSuffix;
  }
  return !wallet.synchronizationError ? Strings.walletUpdating : Strings.walletUpdateFailed;
}

/**
 * @desc Short and ethereum
 * @example
 * const shortAddr = shortEthAddress("0x999d1ce359692aebc26cd969a31d47d150128600")
 *
 * // Will log: 0x999...28600
 * console.log(shortAddr);
 * @param address
 * @return {string}
 */
export function shortEthAddress(address:string) : string {

    return `${address.substring(0, 5)}...${address.slice(-5)}`

}