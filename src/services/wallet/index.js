/* eslint-disable */

import { NativeModules } from 'react-native';
import factory from '../../services/ethereum/factory';
import _ from 'lodash';
import type {WalletType} from "../../types/Wallet";
// import { BALANCE_EXPIRATION_INTERVAL } from '../../global/Constants';

export default class WalletService {
  static async getWallets() {
    const { Panthalassa } = NativeModules;
    const walletKey = await Panthalassa.PanthalassaEthPrivateKey();
    // console.log('EthPrivateKey from Panthalassa: ', walletKey);
    const walletAddress = await Panthalassa.PanthalassaEthAddress();
    // console.log('EthPrivateAddress from Panthalassa: ', walletAddress);
    const walletArray = [{ currency: 'ETH', ethAddress: walletAddress, balance: null, name: 'Ethereum' },
      { currency: 'PAT', ethAddress: walletAddress, balance: null, name: 'PAT' }];
    console.log('----> Converted Wallet: ', walletArray);
    // return convertWallets(walletArray);
    return walletArray;
  }

  static async syncWallet(wallet) {
    // const container = await containerPromise;
    // return await container.eth.wallet.ethSync(wallet.ethAddress);
  }

  static async resolveBalance(wallets: Array<WalletType>): Promise<string> {
    console.log('Entró a Factory');
    const { Panthalassa } = NativeModules;
    const walletKey = await Panthalassa.PanthalassaEthPrivateKey();
    const ethereum = await factory({ private_key: '0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160', provider_type: 'rinkeby' });
    console.log('Pasó await factory');
    const ethService = ethereum.service;
    console.log('Pasó EthJS');

    console.log('Creó Factory');
    console.log('===== > Wallets with balance resolveBalance-Inicio', ethService);

    console.log('Wallet 0', wallets[0]);
    try {
      wallets[0].balance = await ethService.getBalance();
    } catch (error) {
      throw error;
    }

    console.log('Wallet 1', wallets[1]);
    try {
      wallets[1].balance = await ethService.getTokenBalance(wallets[1].ethAddress);
    } catch (error) {
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
