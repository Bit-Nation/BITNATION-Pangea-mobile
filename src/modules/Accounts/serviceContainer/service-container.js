// @flow

import type { Account } from '../types/Account';
import { normalizeHexValue } from '../../src-old/utils/key';
import defaultDB from '../modules/Database/database-service';
import EthereumServiceFactory from './ethereum/factory';
import EthereumService from './ethereum';
import WalletService from './wallet';
import NationsService from '../modules/Nations/nations-service';
import UpstreamService from '../../src-old/services/upstream/upstream';

export default class ServiceContainer {
  static instance: ServiceContainer = new ServiceContainer();

  ethereumService: EthereumService | null = null;
  walletService: WalletService | null = null;
  nationsService: NationsService | null = null;
  upstreamService: UpstreamService | null = null;

  initServices(account: Account, ethPrivateKey: string) {
    const { service } = EthereumServiceFactory({
      privateKey: normalizeHexValue(ethPrivateKey),
      networkType: account.networkType,
      app: 'Default Application',
    });
    this.ethereumService = service;
    this.walletService = new WalletService(this.ethereumService);
    this.nationsService = new NationsService(this.ethereumService, defaultDB, account.id);
    this.upstreamService = new UpstreamService(this.ethereumService);
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
  }
}
