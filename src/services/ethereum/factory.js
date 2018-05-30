// @flow
import EthereumService from './index';
import CustomSigner from './CustomSigner';

/**
 * @desc Factory for the Ethereum service based on EthJS.
 * @param {Array<any>} config Array with: private_key Private Key base for the services, provider_type Type of Network
 * @returns {{wallet: ethers.Wallet, service: EthereumService}} The service
 */

export default function factory(config: {private_key: string, provider_type: string}) {
  const privateKey: string = config.private_key;
  const providerType: string = config.provider_type;

  // @todo check if valid private key - exit if not
  const customSigner = new CustomSigner(privateKey, providerType);

  // Ethereum service
  const ethereumService = new EthereumService(customSigner);

  return {
    wallet: customSigner,
    service: ethereumService,
  };
}
