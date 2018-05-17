import ethers from 'ethers';
import providers from 'ethers/providers';
import Ethereum from '../../../../src/services/ethereum/index';

describe('ethereum', () => {
  let ethereum;
  test('Check send function', async () => {
    const wallet = {
      sendTransaction: transactionObject => (transactionObject),
      estimateGas: () => ({}),
    };
    ethereum = new Ethereum(wallet);
    const result = await ethereum.sendMoney('0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290', '1.0', '2000000000');
    expect(result.to).toEqual('0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290');
  });
  test('Initialize wallet and send ether', async () => {
    const wallet = new ethers.Wallet('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
    wallet.provider = new providers.InfuraProvider('rinkeby');
    ethereum = new Ethereum(wallet);
    let response;
    try {
      response = await ethereum.sendMoney('0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290', '0.00001', '2000000000');
      // console.log('RESPONSE: ', response);
    } catch (e) {
      console.log('error: ', e.responseText);
      throw (e);
    }
    expect(response.from).toEqual('0xF0D346A86A68086846363185d24D5893F4353A78');
  });
  test('Check balance and token balance', async () => {
    const wallet = new ethers.Wallet('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
    wallet.provider = new providers.InfuraProvider('rinkeby');
    ethereum = new Ethereum(wallet);
    let balance;
    try {
      balance = await ethereum.getBalance();
      console.log('ETH balance: ', balance);
      // console.log('RESPONSE: ', response);
    } catch (e) {
      console.log('error: ', e.responseText);
      throw (e);
    }
    try {
      balance = await ethereum.getTokenBalance('0x9EDCb9A9c4d34b5d6A082c86cb4f117A1394F831');
      console.log('token balance: ', balance);
    } catch (e) {
      console.log('error: ', e.responseText);
      throw (e);
    }
  });
});
