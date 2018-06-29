// Mock private key: 0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160
// Mock Public key: 0xF0D346A86A68086846363185d24D5893F4353A78
import CustomSigner from '../../../../src/services/ethereum/CustomSigner';

jest.mock('reconnecting-websocket');

const privateKey = '0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160';
jest.mock('react-native-navigation', () => ({
  Navigation: {
    showModal: jest.fn(config => config.passProps.onSuccess(2, 100000)),
  },
}));

describe('Check Custom Signer', () => {
  test('Check the custom sign function', async () => {
    const customSigner = new CustomSigner(privateKey, 'rinkeby');
    customSigner.estimateGas = () => 1000;
    const signedTransaction = await customSigner.sign({
      to: '0xF0D346A86A68086846363185d24D5893F4353A78',
      from: '0xF0D346A86A68086846363185d24D5893F4353A78',
      amount: '0',
      data: '0x0',
    });
    expect(signedTransaction).toMatch(/0x/);
  });
});
