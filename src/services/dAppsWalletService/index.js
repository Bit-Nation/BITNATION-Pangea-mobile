/* eslint-disable class-methods-use-this */
// @flow

import type { Account } from '../../types/Account';
import {
  PAT_DEV_ADDRESS,
  PAT_PROD_ADDRESS,
} from '../../global/Constants';
import EthereumService from '../ethereum';
import type { CurrencyType } from '../../types/Wallet';

export default class DAppsWalletService {
  constructor(ethereumService: EthereumService, account: Account) {
    this.ethereumService = ethereumService;
    this.currentAccount = account;
  }

  ethereumService: EthereumService;
  currentAccount: Account;

  async sendMoney(currency: CurrencyType, toAddress: string, amount: string): Promise<void> {
    switch (currency) {
      case 'ETH': return this.sendEther(toAddress, amount);
      case 'XPAT': return this.sendXPAT(toAddress, amount);
      default: return Promise.reject(new Error(`Currency ${currency} is not supported`));
    }
  }

  /**
   * @desc Function to send some ether to specificied address.
   * @param {string} toAddress Address to send ether to.
   * @param {string} amount Amount in ether.
   * @return {Promise<void>} Promise
   */
  async sendEther(toAddress: string, amount: string): Promise<void> {
    return this.ethereumService.sendMoney(toAddress, amount);
  }

  /**
   * @desc Function to send some XPAT to specificied address.
   * @param {string} toAddress Address to send ether to.
   * @param {string} amount Amount in XPAT.
   * @return {Promise<void>} Promise
   */
  async sendXPAT(toAddress: string, amount: string) {
    return this.ethereumService.sendTokens(this.currentAccount.networkType === 'dev' ? PAT_DEV_ADDRESS : PAT_PROD_ADDRESS, toAddress, amount);
  }
}
