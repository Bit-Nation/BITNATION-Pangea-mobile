// @flow

import EthereumServiceFactory from './ethereum/factory';
import EthereumService from './ethereum';
import WalletService from './wallet';
import NationsService from './nations';
import type { Account } from '../types/Account';
import { normalizeEthPrivateKey } from '../utils/key';
import defaultDB from './database';

export default class ServiceContainer {
  static instance: ServiceContainer = new ServiceContainer();

  ethereumService: EthereumService | null = null;
  walletService: WalletService | null = null;
  nationsService: NationsService | null = null;

  initServices(account: Account, ethPrivateKey: string) {
    this.ethereumService = EthereumServiceFactory({
      privateKey: normalizeEthPrivateKey('0x14397c5443a68bf84eda0a893f05bf02534b3b73d49f12bc657f8c291bc69b28'),
      providerType: account.networkType === 'dev' ? 'rinkeby' : 'homestead',
    }).service;
    this.walletService = new WalletService(this.ethereumService);
    this.nationsService = new NationsService(this.ethereumService, defaultDB, account.id);
  }

  destroyServices() {
    this.ethereumService = null;
    this.walletService = null;
    if (this.nationsService !== null) {
      this.nationsService.cleanUp();
    }
    this.nationsService = null;
  }
}
