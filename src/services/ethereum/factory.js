// @flow
import ethers from 'ethers';
import providers from 'ethers/providers';
import EthereumService from './index';
import CustomSigner from './CustomSigner';

// export default class EthereumServiceContainer {
//   constructor() {
//     this.ethereumService = null;
//     this.provider = null;
//   }
//
//   getEthereumService() {
//     if (this.ethereumService == null) {
//       const wallet = new ethers.Wallet('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
//       wallet.provider = new ethers.providers.InfuraProvider('rinkeby');
//       this.ethereumService = new EthereumService(wallet);
//     }
//     return this.ethereumService;
//   }
//
//   destroyEthereumService() {
//     this.ethereumService = null;
//   }
// }
export default function factory(config: {private_key: string, provider_type: string}) {
  const privateKey: string = config.private_key;
  const providerType: string = config.provider_type;

  // @todo check if valid private key - exit if not
  const wallet = new ethers.Wallet(privateKey);
  const customSigner = new CustomSigner(privateKey, providerType);
  wallet.sign = customSigner.sign;
  wallet.blah = customSigner.blah;
  wallet.provider = new providers.InfuraProvider(providerType);
  console.log('custom sign function: ', customSigner.sign);
  console.log('wallet sign function: ', wallet.sign);

  // Ethereum service
  const ethereumService = new EthereumService(wallet);

  return {
    wallet,
    service: ethereumService,
  };
}
