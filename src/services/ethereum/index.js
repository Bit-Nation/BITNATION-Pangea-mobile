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

  async signRandom() {
    const transaction = {
      gasPrice: ethers.utils.bigNumberify('2000000'),
      to: '0xF0D346A86A68086846363185d24D5893F4353A78',
      data: '0x',
      value: ethers.utils.parseEther('0.1'),
    };
    return this.wallet.sign(transaction);
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

/**
 * testFunction
 * @returns {Promise<void>} testFunction to get the Private Key
 */
export async function testFunction() {
  try {
    const testingPanthalassa = NativeModules.Panthalassa;
    await testingPanthalassa.PanthalassaStart({ accountStore: ' {“password”:“{\\“cipher_text\\“:\\“olDYk8en3X88H1faxQ_CGBIkvyUSnw==\\“,\\“scrypt_key\\“:{\\“n\\“:16384,\\“r\\“:8,\\“p\\“:1,\\“key_len\\“:32,\\“salt\\“:\\“eHunCXrfM2u4xtiv8/UeFrBOmVuxFTK0L5AYiT/VUZrKLyBCblapLwXSWfGkrC4RoDk=\\“}}“,”encrypted_key_store”:“{\\“cipher_text\\“:\\“8A-HZtEIjC_w764MJe30HRLY-BV74tmt5sN_zfW9riChwtJX4TcShjUFFLOa6MscQ61_e5q3k37BkFE0g1_al105kvq_CKVX1AIjAez4AdgxW4kceZ76SzwmSi6gJ2U3WXs-HvWTmh_FZHEU-8cbc9d15eNjyQBRXy3uLueuY97P9jhB35PmG9ImlPXdIQkR-6caGBllhBI1IcGBg3MbP2WVG_mZIdU7VugQp1Q_j_XGiS3vcwP6Utc13PXWIqq7HvxvtIB0CiqxH62KB8wCGa1qk1M89YqK_cd6wBscxTNtHs2ZRZNWrkilvH3ScA-ivIpZepTBwegZBdHtOq7OGMzm7nLfjkcHEUPZ-AoQbIfX3cERXK0cTQ0yueGIjXRhcjxfxQ==\\“,\\“scrypt_key\\“:{\\“n\\“:16384,\\“r\\“:8,\\“p\\“:1,\\“key_len\\“:32,\\“salt\\“:\\“MU3tzj7CevzBGfs3Z9/9brOJO5BBXhkctzl4ygnGwQKo/AArVWkAF/SMit7G+pEs1vM=\\“}}“,”version”:1}', password: '111111' });
    const result = await testingPanthalassa.PanthalassaEthPrivateKey();
    console.log('Panthalassa: ', result);
    if (result !== null) {
      Alert.alert('Private Key successfully obtained');
    }
  } catch (e) {
    Alert.alert(e.message);
  }
}
