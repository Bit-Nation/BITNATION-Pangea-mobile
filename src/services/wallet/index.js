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

    let ethWallet = _.filter(wallets, { currency: 'ETH' });
    try {
      ethWallet = await ethService.getBalance();
    } catch (error) {
      throw error;
    }
    console.log('===== > Wallets with balance resolveBalance', error);
    return ethWallet;

    /* const container = await containerPromise;
    const walletObject = await container.eth.wallet.ethBalance(wallet.ethAddress);

    if (walletObject === null ||
      (new Date()).getTime() - walletObject.synced_at.getTime() > BALANCE_EXPIRATION_INTERVAL) {
      try {
        await syncWallet(wallet);
        return await resolveBalance(wallet);
      } catch (error) {
        throw error;
      }
    }

    return { ...wallet, balance: walletObject.amount }; */
  }

  static async sendMoney(fromAddress, toAddress, amount) {
    // const container = await containerPromise;
    // return await container.eth.wallet.ethSend(fromAddress, toAddress, amount);
  }
}
