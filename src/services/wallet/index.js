/* eslint-disable */

import { NativeModules } from 'react-native';
import factory from '../../services/ethereum/factory';
import _ from 'lodash';
import type { WalletType } from '../../types/Wallet';
import { BigNumber } from 'bignumber.js';

// import { BALANCE_EXPIRATION_INTERVAL } from '../../global/Constants';

export default class WalletService {
  static async getWallets() {
    const { Panthalassa } = NativeModules;
    const walletAddress = await Panthalassa.PanthalassaEthAddress();
    const walletArray = [{ currency: 'ETH', ethAddress: walletAddress, balance: null, name: 'Ethereum' },
      { currency: 'PAT', ethAddress: walletAddress, balance: null, name: 'PAT' }];
    console.log('----> Converted Wallet: ', walletArray);
    return walletArray;
  }

  static async syncWallet(wallet) {
    // const container = await containerPromise;
    // return await container.eth.wallet.ethSync(wallet.ethAddress);
  }

  static async resolveBalance(wallets: Array<WalletType>): Promise<string> {

    const { Panthalassa } = NativeModules;
    const walletAddress = await Panthalassa.PanthalassaEthPrivateKey();
    const ethereum = await factory({ private_key: '0x' + walletAddress, provider_type: 'rinkeby' });
    const ethService = ethereum.service;

    console.log('Wallet 0', wallets[0]);
    try {
      const balance = await ethService.getBalance();
      let balanceBN = new BigNumber(balance);
      console.log('Balance 0 :', balanceBN);
      wallets[0].balance = balanceBN.round(5).toString(10);
    } catch (error) {
      wallets[0].balance = undefined;
      throw error;
    }

    console.log('Wallet 1', wallets[1]);
    try {
      const balance = await ethService.getTokenBalance('0xc3830a6206fb9d089d1ce824598978532d14d8aa');
      let balanceBN = new BigNumber(balance);
      console.log('Balance 1 :', balanceBN);
      wallets[1].balance = balanceBN.round(5).toString(10);
    } catch (error) {
      wallets[1].balance = undefined;
      throw error;
    }

/*
    const walletBalances = Promise.all(wallets.map(async (walletTemp, index) => {
      if (walletTemp[index].currency === 'ETH'){
        try {
          const balance  = await ethService.getBalance();
          return balance;
        } catch (error) {
          return undefined;
        }
      } else {
        try {
          const balance  = await ethService.getTokenBalance(walletTemp[index].ethAddress);
          return balance;
        } catch (e) {
          // handle error so that all promises won't be rejected because one wallet failed to resolve balance.
          return undefined; // maybe like that
        }
      }
    }));

    console.log('-> Balances: ', walletBalances);
    */

    /*
    wallets.forEach(async function (walletTemp, index, originalWallet) {
      console.log('Foreach Wallet: ', walletTemp[index]);
      if (walletTemp[index].currency === 'ETH'){
        try {
          walletTemp[index].balance = await ethService.getBalance();
          console.log('Wallet with Balance: ', walletTemp[index]);
        } catch (error) {
          throw error;
        }
      } else {
        walletTemp[index].balance = await ethService.getTokenBalance(walletTemp[index].ethAddress);
      }
    });*/

    return wallets;
  }

  static async sendMoney(fromAddress, toAddress, amount) {
    // const container = await containerPromise;
    // return await container.eth.wallet.ethSend(fromAddress, toAddress, amount);
  }
}
