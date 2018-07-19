// @flow

/**
 * @desc Utility type to be used as possible currency values.
 */
export type CurrencyType = 'ETH' | 'XPAT';

/**
 * @desc Wallet type used in the app.
 */
export type WalletType = {
  ethAddress: string,
  currency: CurrencyType,
  balance: string | null,
  name: string,
}
