// Mock private key: 0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160
// Public key: 0xF0D346A86A68086846363185d24D5893F4353A78

import factory from '../../../../src/services/ethereum/factory';
import EthereumService from '../../../../src/services/ethereum/index';

jest.mock('reconnecting-websocket');

const privateKeyMock = jest.fn();
privateKeyMock.mockReturnValueOnce('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');

describe('factory', () => {
  test('Check ethereum Service creation', async () => {
    const ethereum = await factory({ privateKey: privateKeyMock(), providerType: 'rinkeby' });
    const ethereumService = ethereum.service;
    expect(ethereumService).toBeInstanceOf(EthereumService);
  });
});
