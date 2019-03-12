// @flow

import type { Account } from './types/accounts-types';
/*
import { normalizeHexValue } from '../../src-old/utils/key';
import defaultDB from '../modules/Database/database-service';
import EthereumServiceFactory from '@pangea/ethereum/factory';
import EthereumService from '@pangea/ethereum';
import WalletService from './wallet';
import NationsService from '../modules/Nations/nations-service';
import UpstreamService from '../../src-old/services/upstream/upstream';
*/
export class PangeaService {
  name: string;
  cleanup: () => void;
  init: (Account, string) => void;

  constructor(name: string) {
    this.name = name;
  }
}
export class ServiceContainer {
  static instance: ServiceContainer = new ServiceContainer();
  services: Map<string, PangeaService> = new Map();

  initServices(factory: () => Map<string, PangeaService>) {
    try {
      this.services = factory();
    }
    catch (err) {

    }
  }

  getService(name: string): ?PangeaService {
    if (!this.services.has(name)) {
      return null;
    }
    return this.services.get(name);
  }

  destroyServices() {
    this.services.forEach((service, name) => {
      try {
        service.cleanup();
      }
      catch (err) {

      }
    });
    this.services = new Map();
  }
  
/*
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
  */
}
