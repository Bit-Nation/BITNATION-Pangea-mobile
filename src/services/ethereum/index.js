import ethers from 'ethers';
import { Alert, NativeModules } from 'react-native';

const myMock = jest.fn();
myMock.mockReturnValueOnce('0x0123456789012345678901234567890123456789012345678901234567890123');

export default class EthereumService {

  wallet = {};

  async initializeWallet() {
    try {
      // const testingPanthalassa = NativeModules.Panthalassa;
      // await testingPanthalassa.PanthalassaStart({ accountStore: ' {“password”:“{\\“cipher_text\\“:\\“olDYk8en3X88H1faxQ_CGBIkvyUSnw==\\“,\\“scrypt_key\\“:{\\“n\\“:16384,\\“r\\“:8,\\“p\\“:1,\\“key_len\\“:32,\\“salt\\“:\\“eHunCXrfM2u4xtiv8/UeFrBOmVuxFTK0L5AYiT/VUZrKLyBCblapLwXSWfGkrC4RoDk=\\“}}“,”encrypted_key_store”:“{\\“cipher_text\\“:\\“8A-HZtEIjC_w764MJe30HRLY-BV74tmt5sN_zfW9riChwtJX4TcShjUFFLOa6MscQ61_e5q3k37BkFE0g1_al105kvq_CKVX1AIjAez4AdgxW4kceZ76SzwmSi6gJ2U3WXs-HvWTmh_FZHEU-8cbc9d15eNjyQBRXy3uLueuY97P9jhB35PmG9ImlPXdIQkR-6caGBllhBI1IcGBg3MbP2WVG_mZIdU7VugQp1Q_j_XGiS3vcwP6Utc13PXWIqq7HvxvtIB0CiqxH62KB8wCGa1qk1M89YqK_cd6wBscxTNtHs2ZRZNWrkilvH3ScA-ivIpZepTBwegZBdHtOq7OGMzm7nLfjkcHEUPZ-AoQbIfX3cERXK0cTQ0yueGIjXRhcjxfxQ==\\“,\\“scrypt_key\\“:{\\“n\\“:16384,\\“r\\“:8,\\“p\\“:1,\\“key_len\\“:32,\\“salt\\“:\\“MU3tzj7CevzBGfs3Z9/9brOJO5BBXhkctzl4ygnGwQKo/AArVWkAF/SMit7G+pEs1vM=\\“}}“,”version”:1}', password: '111111' });
      // const result = await testingPanthalassa.PanthalassaEthPrivateKey();
      const result = await myMock();
      if (result !== null) {
        console.log('Private Key successfully obtained');
        this.wallet = new ethers.Wallet('0x0123456789012345678901234567890123456789012345678901234567890123');
        this.wallet.provider = ethers.providers.getDefaultProvider();
        console.log('wallet: ', this.wallet);
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  async sendMoney(toAddress: string, amount: string, gasPrice: string): Promise<void> {

    const transaction = {
      gasLimit: 21000,
      gasPrice: ethers.utils.bigNumberify(gasPrice),
      to: toAddress,
      data: '0x',
      value: ethers.utils.parseEther(amount),
    };

    const gasEstimate = await this.wallet.estimateGas(transaction);
    console.log('estimated gas: ', gasEstimate);
    console.log('transaction: ', transaction);

    return this.wallet.send(transaction);
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
