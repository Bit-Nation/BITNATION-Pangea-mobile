// @flow
import EthereumService from './index';
import CustomSigner from './CustomSigner';

/**
 * @desc Factory for the Ethereum service based on EthJS.
 * @param {Object<any>} config Array with: private_key Private Key base for the services, provider_type Type of Network
 * @returns {{wallet: ethers.Wallet, service: EthereumService}} The service
 */
export default function factory(config: {privateKey: string, providerType: string}) {
  const { privateKey }: string = config;
  const { providerType }: string = config;

  // @todo check if valid private key - exit if not
  const customSigner = new CustomSigner(privateKey, providerType);

  // Ethereum service
  const ethereumService = new EthereumService(customSigner);

  return {
    wallet: customSigner,
    service: ethereumService,
  };
}
