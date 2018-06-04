// @flow

import { NativeModules } from 'react-native';
import { BigNumber } from 'bignumber.js';
import factory from '../../services/ethereum/factory';
import type { WalletType } from '../../types/Wallet';
import {
  PAT_DEV_ADDRESS,
  PAT_PROD_ADDRESS,
} from '../../global/Constants';

export default class WalletService {
  static async getWallets() {
    const { Panthalassa } = NativeModules;
    const walletAddress = await Panthalassa.PanthalassaEthAddress();
    const walletArray = [{
      currency: 'ETH', ethAddress: walletAddress, balance: null, name: 'Ethereum',
    }, {
      currency: 'PAT', ethAddress: walletAddress, balance: null, name: 'XPAT',
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
    const ethereum = await factory({ privateKey: `0x${walletAddress}`, providerType: network === 'dev' ? 'rinkeby' : 'homestead' });
    const ethService = ethereum.service;

    const balanceEth = await ethService.getBalance();
    BigNumber.config({ DECIMAL_PLACES: 18 });
    const balanceBNEth = new BigNumber(balanceEth);
    walletsToCheck[0].balance = balanceBNEth.times(10e-19).toString(10);

    const balancePAT = await ethService.getTokenBalance(network === 'dev' ? PAT_DEV_ADDRESS : PAT_PROD_ADDRESS);
    const balanceBNPAT = new BigNumber(balancePAT);
    walletsToCheck[1].balance = balanceBNPAT.times(10e-19).toString(10);
    return walletsToCheck;
  }
  static async sendMoney(fromAddress, toAddress, amount, network) {
    const { Panthalassa } = NativeModules;
    const walletAddress = await Panthalassa.PanthalassaEthPrivateKey();
    const ethereum = await factory({ privateKey: `0x${walletAddress}`, providerType: network === 'dev' ? 'rinkeby' : 'homestead' });
    const ethService = ethereum.service;
    return ethService.sendMoney(toAddress, amount);
  }

  static async sendToken(fromAddress, toAddress, amount, network) {
    const { Panthalassa } = NativeModules;
    const walletAddress = await Panthalassa.PanthalassaEthPrivateKey();
    const ethereum = await factory({ privateKey: `0x${walletAddress}`, providerType: network === 'dev' ? 'rinkeby' : 'homestead' });
    const ethService = ethereum.service;
    return ethService.sendTokens(network === 'dev' ? PAT_DEV_ADDRESS : PAT_PROD_ADDRESS, toAddress, amount);
  }
}
