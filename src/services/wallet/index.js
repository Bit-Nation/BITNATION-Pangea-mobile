// @flow

import { NativeModules } from 'react-native';
import { BigNumber } from 'bignumber.js';
import factory from '../../services/ethereum/factory';
import type { WalletType } from '../../types/Wallet';
// import { BALANCE_EXPIRATION_INTERVAL } from '../../global/Constants';

export default class WalletService {
  static async getWallets() {
    const { Panthalassa } = NativeModules;
    const walletAddress = await Panthalassa.PanthalassaEthAddress();
    const walletArray = [{
      currency: 'ETH', ethAddress: walletAddress, balance: null, name: 'Ethereum',
    }, {
      currency: 'PAT', ethAddress: walletAddress, balance: null, name: 'PAT',
    }];
    return walletArray;
  }

  static async syncWallet(wallet: WalletType) {
    // const container = await containerPromise;
    // return await container.eth.wallet.ethSync(wallet.ethAddress);
    return wallet;
  }

  static async resolveBalance(wallets: Array<WalletType>, network: string) {
    const walletsToCheck: Array<WalletType> = wallets;
    const { Panthalassa } = NativeModules;
    const walletAddress = await Panthalassa.PanthalassaEthPrivateKey();
    const ethereum = await factory({ private_key: `0x${walletAddress}`, provider_type: network === 'dev' ? 'rinkeby' : 'homestead' });
    const ethService = ethereum.service;

    try {
      const balance = await ethService.getBalance();
      console.log('Resolved balance: ', balance);
      BigNumber.config({ DECIMAL_PLACES: 5 });
      const balanceBN = new BigNumber(balance);
      walletsToCheck[0].balance = balanceBN.times(10e-19).round(5).toString(10);
    } catch (error) {
      // walletsToCheck[0].balance = undefined;
      console.log('error found in trying to get balance');
      throw error;
    }

    try {
      const balance = await ethService.getTokenBalance(network === 'dev' ? '0xc3830a6206fb9d089d1ce824598978532d14d8aa' : '0xBB1fA4FdEB3459733bF67EbC6f893003fA976a82');
      const balanceBN = new BigNumber(balance);
      walletsToCheck[1].balance = balanceBN.times(10e-22).round(5).toString(10);
    } catch (error) {
      // walletsToCheck[1].balance = undefined;
      throw error;
    }

    return walletsToCheck;
  }

  // @Todo Check this part with William
  static async sendMoney(fromAddress, toAddress, amount, network) {
    const ethereum = await factory({ private_key: `0x${fromAddress}`, provider_type: network === 'dev' ? 'rinkeby' : 'homestead' });
    const ethService = ethereum.service;
    return ethService.sendMoney(toAddress, amount, '00001');
  }
}
