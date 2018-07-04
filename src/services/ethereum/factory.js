// @flow

import EthereumService from './index';
import CustomSigner from './CustomSigner';
import type { NetworkType } from '../../types/Account';

/**
 * @desc Factory for the Ethereum service based on EthJS.
 * @param {Object<any>} config Array with: privateKey Private Key base for the services, providerType Type of Network
 * @returns {{wallet: ethers.Wallet, service: EthereumService}} The service
 */
export default function factory(config: {privateKey: string, networkType: NetworkType, app: string, purpose: string}) {
  const { privateKey } = config;
  const { networkType } = config;
  let { app } = config;
  if (app == null) {
    app = 'Default Application';
  }
  let { purpose } = config;
  if (purpose == null) {
    purpose = 'Send Money';
  }

  // @todo check if valid private key - exit if not
  const customSigner = new CustomSigner(privateKey, networkType === 'dev' ? 'rinkeby' : 'homestead', app, purpose);

  // Ethereum service
  const ethereumService = new EthereumService(customSigner, networkType);

  return {
    wallet: customSigner,
    service: ethereumService,
  };
}
