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
   * @return {Promise<Object>} Promise that resolves into transaction
   */
  async sendMoney(app: string, currency: CurrencyType, toAddress: string, amount: string): Promise<Object> {
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
   * @return {Promise<Object>} Promise that resolves into transaction
   */
  async sendEther(app: string, toAddress: string, amount: string): Promise<Object> {
    return this.getEthereumServiceForDApp(app).sendMoney(toAddress, amount);
  }

  /**
   * @desc Function to send some XPAT to specificied address.
   * @param {string} app Name of the app that requests send.
   * @param {string} toAddress Address to send ether to.
   * @param {string} amount Amount in XPAT.
   * @return {Promise<Object>} Promise that resolves into transaction
   */
  async sendXPAT(app: string, toAddress: string, amount: string): Promise<Object> {
    return this.getEthereumServiceForDApp(app).sendTokens(this.getXPATTokenAddress(), toAddress, amount);
  }

  /**
   * @desc Deploy contract and return a deploy transaction.
   * @param {string} app Name of the app that requests deploy.
   * @param {string} bytecode Byte code of contract
   * @param {string} abi ABI of contract
   * @param {any} params Additional params to pass.
   * @return {Promise<Object>} Promise that resolves into transaction
   */
  async deployContract(app: string, bytecode: string, abi: string, ...params: any): Promise<Object> {
    return this.getEthereumServiceForDApp(app).deployContract(bytecode, abi, ...params);
  }

  getXPATTokenAddress = (): string => (this.currentAccount.networkType === 'dev' ? PAT_DEV_ADDRESS : PAT_PROD_ADDRESS)
}
