/* eslint-disable no-unused-vars */

import ethers from 'ethers';
import providers from 'ethers/providers';
import Ethereum from '../../../../src/services/ethereum/index';
import ContractInfo from '../../../../src/dapps/escrow/ABI.json';

describe('ethereum', () => {
  let ethereum;
  test('Initialize wallet and send ether', async () => {
    const wallet = new ethers.Wallet('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
    wallet.provider = new providers.InfuraProvider('rinkeby');
    ethereum = new Ethereum(wallet, 'dev');
    let gasEstimate;
    let response;
    try {
      gasEstimate = await ethereum.estimateGas('2000000000', '0x0');
      response = await ethereum.sendMoney('0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290', '0.00001', '2000000000');
    } catch (e) {
      throw (e);
    }
    expect(response.from).toEqual('0xF0D346A86A68086846363185d24D5893F4353A78');
  });
  test('Check balance and token balance', async () => {
    const wallet = new ethers.Wallet('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
    wallet.provider = new providers.InfuraProvider('rinkeby');
    ethereum = new Ethereum(wallet, 'dev');
    let balance;
    balance = await ethereum.getBalance();
    balance = await ethereum.getTokenBalance('0x9EDCb9A9c4d34b5d6A082c86cb4f117A1394F831');
  });
  test('Check nations object', async () => {
    const wallet = new ethers.Wallet('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
    wallet.provider = new providers.InfuraProvider('rinkeby');
    ethereum = new Ethereum(wallet, 'dev');
    const nationsObject = ethereum.nations;
    const numCitizens = await nationsObject.getNumCitizens(0);
    expect(numCitizens.toNumber()).toEqual(0);
  });
  test('Create contract test', async () => {
    const wallet = new ethers.Wallet('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
    wallet.provider = new providers.InfuraProvider('rinkeby');
    ethereum = new Ethereum(wallet, 'dev');
    // const txReceipt = await ethereum.deployContract(
    //   ContractInfo.bytecode,
    //   ContractInfo.abi,
    //   '0xC3830A6206fB9d089D1ce824598978532D14d8Aa',
    //   '0',
    //   '0',
    //   '0xcd4dd4fd12acD06fD49509516Bb136A0B496d451',
    //   false,
    // );
  });
});
