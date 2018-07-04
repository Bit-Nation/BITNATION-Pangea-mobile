/* eslint-disable class-methods-use-this */
// @flow

import type { Account } from '../../types/Account';
import {
  PAT_DEV_ADDRESS,
  PAT_PROD_ADDRESS,
} from '../../global/Constants';
import EthereumService from '../ethereum';
import type { CurrencyType } from '../../types/Wallet';
import EthereumServiceFactory from '../ethereum/factory';
import { normalizeEthPrivateKey } from '../../utils/key';

export default class DAppsWalletService {
  constructor(ethereumService: EthereumService, serviceBuilder: (app: string) => EthereumService, account: Account) {
    this.ethereumService = ethereumService;
    this.currentAccount = account;
    this.serviceBuilder = serviceBuilder;
  }

  ethereumService: EthereumService;
  dAppsEthereumServices: { [string]: EthereumService } = {};
  currentAccount: Account;
  serviceBuilder: (app: string) => EthereumService;

  /**
   * @desc Function to send money.
   * @param {string} app Name of the app that requests send.
   * @param {CurrencyType} currency Currency name (ETH, XPAT, etc).
   * @param {string} toAddress Address to send ether to.
   * @param {string} amount Amount in base currency unit (ether, XPAT, etc.)
   * @return {Promise<void>} Promise
   */
  async sendMoney(app: string, currency: CurrencyType, toAddress: string, amount: string): Promise<void> {
    switch (currency) {
      case 'ETH':
        return this.sendEther(app, toAddress, amount);
      case 'XPAT':
        return this.sendXPAT(app, toAddress, amount);
      default:
        return Promise.reject(new Error(`Currency ${currency} is not supported`));
    }
  }

  getEthereumServiceForDApp(app: string) {
    if (app == null || app === '') {
      throw Error('app parameter should be specified on send money request');
    }
    if (this.dAppsEthereumServices[app] == null) {
      this.dAppsEthereumServices[app] = this.serviceBuilder(app);
    }

    return this.dAppsEthereumServices[app];
  }

  /**
   * @desc Function to send some ether to specificied address.
   * @param {string} app Name of the app that requests send.
   * @param {string} toAddress Address to send ether to.
   * @param {string} amount Amount in ether.
   * @return {Promise<void>} Promise
   */
  async sendEther(app: string, toAddress: string, amount: string): Promise<void> {
    return this.getEthereumServiceForDApp(app).sendMoney(toAddress, amount);
  }

  /**
   * @desc Function to send some XPAT to specificied address.
   * @param {string} app Name of the app that requests send.
   * @param {string} toAddress Address to send ether to.
   * @param {string} amount Amount in XPAT.
   * @return {Promise<void>} Promise
   */
  async sendXPAT(app: string, toAddress: string, amount: string) {
    return this.getEthereumServiceForDApp(app).sendTokens(this.currentAccount.networkType === 'dev' ? PAT_DEV_ADDRESS : PAT_PROD_ADDRESS, toAddress, amount);
  }
}
