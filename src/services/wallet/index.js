/* eslint-disable class-methods-use-this */
// @flow

import { NativeModules } from 'react-native';
import { BigNumber } from 'bignumber.js';
import type { WalletType } from '../../types/Wallet';
import {
  PAT_DEV_ADDRESS,
  PAT_PROD_ADDRESS,
} from '../../global/Constants';
import EthereumService from '../ethereum';

export default class WalletService {
  constructor(ethereumService: EthereumService) {
    this.ethereumService = ethereumService;
  }

  ethereumService: EthereumService;

  async getWallets() {
    const { Panthalassa } = NativeModules;
    const walletAddress = await Panthalassa.PanthalassaEthAddress();
    const walletArray = [{
      currency: 'ETH', ethAddress: walletAddress, balance: null, name: 'Ethereum',
    }, {
      currency: 'PAT', ethAddress: walletAddress, balance: null, name: 'XPAT',
    }];
    return walletArray;
  }

  async syncWallet(wallet: WalletType) {
    // const container = await containerPromise;
    // return await container.eth.wallet.ethSync(wallet.ethAddress);
    return wallet;
  }

  async resolveBalance(wallets: Array<WalletType>, network: string) {
    const walletsToCheck: Array<WalletType> = wallets;
    const ethService = this.ethereumService;

    const balanceEth = await ethService.getBalance();
    BigNumber.config({ DECIMAL_PLACES: 18 });
    const balanceBNEth = new BigNumber(balanceEth);
    walletsToCheck[0].balance = balanceBNEth.div(new BigNumber(10).pow(18)).toString(10);


    const balancePAT = await ethService.getTokenBalance(network === 'dev' ? PAT_DEV_ADDRESS : PAT_PROD_ADDRESS);
    const balanceBNPAT = new BigNumber(balancePAT);
    walletsToCheck[1].balance = balanceBNPAT.div(new BigNumber(10).pow(18)).toString(10);
    return walletsToCheck;
  }

  async sendMoney(fromAddress: string, toAddress: string, amount: string) {
    return this.ethereumService.sendMoney(toAddress, amount);
  }

  async sendToken(fromAddress: string, toAddress: string, amount: string, network: string) {
    return this.ethereumService.sendTokens(network === 'dev' ? PAT_DEV_ADDRESS : PAT_PROD_ADDRESS, toAddress, amount);
  }
}
