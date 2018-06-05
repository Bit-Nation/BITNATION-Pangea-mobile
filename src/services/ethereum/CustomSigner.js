// @flow
import ethers from 'ethers';

import { Navigation } from 'react-native-navigation';
import { screen } from '../../global/Screens';

/**
 * @desc Custom signer for ethereum RPC
 * @example
 * const customSigner = CustomSigner(PRIVATE_KEY, 'homestead')
 *
 * @param {string} privateKey Private key of wallet
 * @param {string} provider name of network
 * @return {object} custom signer with wallet functions
 */
export default function CustomSigner(privateKey: string, provider: string) {
  const wallet = new ethers.Wallet(privateKey);
  this.provider = new ethers.providers.InfuraProvider(provider);
  this.address = wallet.address;
  this.getBalance = wallet.getBalance;
  this.estimateGas = wallet.estimateGas;
  this.getTransactionCount = wallet.getTransaction;
  this.defaultGasLimit = wallet.defaultGasLimit;
  this.sign = async (transaction) => {
    const transactionObject = transaction;
    try {
      const signedTransaction = await new Promise((resolve, reject) => {
        Navigation.showModal({
          ...screen('CONFIRMATION_SCREEN'),
          passProps: {
            onFail: () => {
              reject();
            },
            onSuccess: (gasPrice) => {
              // Here we have gasPrice which is in wei, so we need to convert it into gwei.
              transactionObject.gasPrice = ethers.utils.bigNumberify(`${gasPrice.toString()}000000000`);
              resolve(wallet.sign(transactionObject));
            },
          },
        });
      });
      return signedTransaction;
    } catch (e) {
      console.log('error: ', e);
      throw new Error('Transaction aborted!');
    }
  };
  this.sendTransaction = (transaction) => {
    if (!this.provider) { throw new Error('missing provider'); }

    if (!transaction || typeof (transaction) !== 'object') {
      throw new Error('invalid transaction object');
    }

    let { gasLimit } = transaction;
    if (gasLimit == null) { gasLimit = this.defaultGasLimit; }

    const self = this;

    let gasPricePromise = null;
    if (transaction.gasPrice) {
      gasPricePromise = Promise.resolve(transaction.gasPrice);
    } else {
      gasPricePromise = this.provider.getGasPrice();
    }

    let noncePromise = null;
    if (transaction.nonce) {
      noncePromise = Promise.resolve(transaction.nonce);
    } else {
      noncePromise = this.provider.getTransactionCount(self.address, 'pending');
    }

    const { chainId } = this.provider;

    let toPromise = null;
    if (transaction.to) {
      toPromise = this.provider.resolveName(transaction.to);
    } else {
      toPromise = Promise.resolve(undefined);
    }

    const data = ethers.utils.hexlify(transaction.data || '0x');
    const value = ethers.utils.hexlify(transaction.value || 0);

    return Promise.all([gasPricePromise, noncePromise, toPromise]).then(async (results) => {
      const signedTransaction = await self.sign({
        to: results[2],
        data,
        gasLimit,
        gasPrice: results[0],
        nonce: results[1],
        value,
        chainId,
      });

      return self.provider.sendTransaction(signedTransaction).then((hash) => {
        const sentTransaction = ethers.Wallet.parseTransaction(signedTransaction);
        sentTransaction.hash = hash;
        return sentTransaction;
      });
    });
  };
}
