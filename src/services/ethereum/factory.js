// @flow
import ethers from 'ethers';
import providers from 'ethers/providers';
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
  // let wallet = new ethers.Wallet(privateKey);
  const customSigner = new CustomSigner(privateKey, providerType);
  // wallet.sign = customSigner.sign;
  // wallet.provider = new providers.InfuraProvider(providerType);
  // console.log('custom sign function: ', customSigner.sign);
  // console.log('wallet sign function: ', wallet.sign);

  // Ethereum service
  const ethereumService = new EthereumService(customSigner);

  return {
    wallet: customSigner,
    service: ethereumService,
  };
}
