// Mock private key: 0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160
// Public key: 0xF0D346A86A68086846363185d24D5893F4353A78

import factory from '../../../../src/services/ethereum/factory';
import EthereumService from '../../../../src/services/ethereum/index';

const myMock = jest.fn();
myMock.mockReturnValueOnce('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');

describe('factory', () => {
  test('Check ethereum Service creation', async () => {
    const ethereum = await factory({ private_key: myMock(), provider_type: 'rinkeby' });
    const ethereumService = ethereum.service;
    expect(ethereumService).toBeInstanceOf(EthereumService);
  });
  test('Full send money transaction process', async () => {
    const ethereum = await factory({ private_key: '0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160', provider_type: 'rinkeby' });
    const ethereumService = ethereum.service;
    let gasEstimate;
    let result;
    try {
      gasEstimate = await ethereumService.estimateGas('2000000000', '0x');
      const transaction = await ethereumService.sendMoney('0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290', '0.00001', '2000000000');
      const transactionHash = transaction.hash;
      result = await ethereumService.trackTransaction(transactionHash);
    } catch (e) {
      console.log('error: ', e);
    }
    expect(gasEstimate).toEqual(42000000000000);
    expect(result.from).toEqual('0xF0D346A86A68086846363185d24D5893F4353A78');
  }, 60000);
});
