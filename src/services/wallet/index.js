/* eslint-disable */

import { NativeModules } from 'react-native';
import { convertWallets } from '../../utils/wallet';
// import { BALANCE_EXPIRATION_INTERVAL } from '../../global/Constants';

export default class WalletService {
  static async getWallets() {
    const { Panthalassa } = NativeModules;
    const walletKey = await Panthalassa.PanthalassaEthPrivateKey();
    // console.log('EthPrivateKey from Panthalassa: ', walletKey);
    const walletAddress = await Panthalassa.PanthalassaEthAddress();
    // console.log('EthPrivateAddress from Panthalassa: ', walletAddress);
    const walletArray = [{ ethAddress: walletAddress, currency: 'ETH', balance: undefined, name: 'Ethereum' },
      { ethAddress: walletAddress, currency: 'PAT', balance: undefined, name: 'PAT' }];
    console.log('----> Converted Wallet: ', walletArray);
    // return convertWallets(walletArray);
    return walletArray;
  }

  static async syncWallet(wallet) {
    // const container = await containerPromise;
    // return await container.eth.wallet.ethSync(wallet.ethAddress);
  }

  static async resolveBalance(wallet) {
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
