// @flow

import { EthereumService } from './index';
import CustomSigner from './CustomSigner';
import type { NetworkType } from 'pangea-common/types/accounts-types';

/**
 * @desc Factory for the Ethereum service based on EthJS.
 * @param {Object<any>} config Array with: privateKey Private Key base for the services, providerType Type of Network
 * @returns {{wallet: ethers.Wallet, service: EthereumService}} The service
 */
export default function factory(config: {privateKey: string, networkType: NetworkType, app: string}) {
  const { privateKey } = config;
  const { networkType } = config;

  const serviceBuilder = (application: string): EthereumService => {
    let networkType2 : NetworkType = networkType;
    if (networkType2 === undefined) {
      networkType2 = 'main';
    }
    const customSigner = new CustomSigner(privateKey, networkType === 'dev' ? 'rinkeby' : 'homestead', application);
    return new EthereumService(customSigner, networkType2);
  };

  let { app } = config;
  if (app == null) {
    app = 'Bitnation Application';
  }

  let service = serviceBuilder(app);
  return {
    service,
    serviceBuilder,
  };
}
