// @flow

import type { Account } from '../types/Account';
import { normalizeEthPrivateKey } from '../utils/key';
import defaultDB from './database';
import EthereumServiceFactory from './ethereum/factory';
import EthereumService from './ethereum';
import WalletService from './wallet';
import NationsService from './nations';
import UpstreamService from './upstream/upstream';
import DAppsWalletService from './dAppsWalletService';

export default class ServiceContainer {
  static instance: ServiceContainer = new ServiceContainer();

  ethereumService: EthereumService | null = null;
  walletService: WalletService | null = null;
  nationsService: NationsService | null = null;
  upstreamService: UpstreamService | null = null;
  dAppsWalletService: DAppsWalletService | null = null;

  initServices(account: Account, ethPrivateKey: string) {
    const { service, serviceBuilder } = EthereumServiceFactory({
      privateKey: normalizeEthPrivateKey(ethPrivateKey),
      networkType: account.networkType,
      app: 'Default Application',
    });
    this.ethereumService = service;
    this.walletService = new WalletService(this.ethereumService);
    this.nationsService = new NationsService(this.ethereumService, defaultDB, account.id);
    this.upstreamService = new UpstreamService(this.ethereumService);
    this.dAppsWalletService = new DAppsWalletService(this.ethereumService, serviceBuilder, account);
  }

  destroyServices() {
    this.ethereumService = null;
    this.walletService = null;
    if (this.nationsService !== null) {
      this.nationsService.cleanUp();
    }
    this.nationsService = null;
    if (this.upstreamService !== null) {
      this.upstreamService.cleanUp();
    }
    this.upstreamService = null;
    this.dAppsWalletService = null;
  }
}
