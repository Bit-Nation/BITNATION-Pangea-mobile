/* eslint-disable */

import ethers from 'ethers';
import { Alert, NativeModules } from 'react-native';
import ERC20ABI from './ERC20ABI.json';

export default class EthereumService {

  constructor(wallet) {
    this.wallet = wallet;
  }
  async getBalance(): string {
    const balance = await this.wallet.getBalance('latest');
    return balance;
  }

  async getTokenBalance(tokenAddress: string): string {
    const abi = ERC20ABI;
    const contract = new ethers.Contract(tokenAddress, abi, this.wallet.provider);
    const balance = await contract.balanceOf(this.wallet.address);
    return balance;
  }

  async estimateGas(gasPrice: string, data: string): string {
    const transaction = {
      gasPrice: ethers.utils.bigNumberify(gasPrice),
      to: '0xF0D346A86A68086846363185d24D5893F4353A78',
      data,
      value: ethers.utils.parseEther('0.1'),
    };

    const gasEstimate = await this.wallet.estimateGas(transaction);
    const fullGasEstimate = gasEstimate * parseInt(gasPrice);

    return fullGasEstimate;
  }

  // Function to send money to an address given amount and gasPrice. Returns
  // promise of when transaction is deployed.
  sendMoney(toAddress: string, amount: string, gasPrice: string): Promise<void> {
    const transaction = {
      gasLimit: 21000,
      gasPrice: ethers.utils.bigNumberify(gasPrice),
      to: toAddress,
      data: '0x',
      value: ethers.utils.parseEther(amount),
    };
    return this.wallet.sendTransaction(transaction);
  }

  // Returns a promise that resolves when the transaction given is mined.
  trackTransaction(transactionHash: string): Promise<void> {
    return this.wallet.provider.waitForTransaction(transactionHash);
  }
}
