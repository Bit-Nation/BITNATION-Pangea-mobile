// @flow

import EthereumService from './index';
import CustomSigner from './CustomSigner';

/**
 * @desc Factory for the Ethereum service based on EthJS.
 * @param {Object<any>} config Array with: privateKey Private Key base for the services, providerType Type of Network
 * @returns {{wallet: ethers.Wallet, service: EthereumService}} The service
 */
export default function factory(config: {privateKey: string, providerType: string}) {
  const { privateKey } = config;
  const { providerType } = config;

  // @todo check if valid private key - exit if not
  const customSigner = new CustomSigner(privateKey, providerType);

  // Ethereum service
  const ethereumService = new EthereumService(customSigner, providerType === 'rinkeby' ? 'dev' : 'prod');

  return {
    wallet: customSigner,
    service: ethereumService,
  };
}
