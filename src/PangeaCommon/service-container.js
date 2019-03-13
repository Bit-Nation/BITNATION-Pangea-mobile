// @flow

import type { Account } from './types/accounts-types';

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
}
