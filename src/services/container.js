// @flow

import EthereumServiceFactory from './ethereum/factory';
import EthereumService from './ethereum';
import WalletService from './wallet';
import type { Account } from '../types/Account';
import { normalizeEthPrivateKey } from '../utils/key';

export default class ServiceContainer {
  static instance: ServiceContainer = new ServiceContainer();

  ethereumService: EthereumService | null = null;
  walletService: WalletService | null = null;

  initServices(account: Account, ethPrivateKey: string) {
    this.ethereumService = EthereumServiceFactory({
      privateKey: normalizeEthPrivateKey(ethPrivateKey),
      providerType: account.networkType === 'dev' ? 'rinkeby' : 'homestead',
    }).service;
    this.walletService = new WalletService(this.ethereumService);
  }

  destroyServices() {
    this.ethereumService = null;
    this.walletService = null;
  }
}
