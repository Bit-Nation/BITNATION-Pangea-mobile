import BN from 'bn.js';

import { Navigation } from 'react-native-navigation';
import { screen } from '../../global/Screens';

const ethers = require('ethers');

export default function CustomSigner(privateKey, provider) {

  const wallet = new ethers.Wallet(privateKey);
  // wallet.provider = new ethers.providers.InfuraProvider(provider);
  this.provider = new ethers.providers.InfuraProvider(provider);
  this.address = wallet.address;
  this.getBalance = wallet.getBalance;
  this.estimateGas = wallet.estimateGas;
  this.sign = async (transaction) => {
    const transactionObject = transaction;
    console.log('signing transaction: ', transactionObject);
    const networkGasPrice = await this.provider.getGasPrice();
    console.log('network gas price: ', networkGasPrice);
    const signedTransaction = await new Promise((resolve, reject) => {
      Navigation.showModal({
        ...screen('CONFIRMATION_SCREEN'),
        passProps: {
          onFail: () => {
            reject();
          },
          onSuccess: (gasPrice) => {
            // Here we have gasPrice to pass it somewhere later.
            console.log('gasprice: ', gasPrice);
            const gasP = new BN(gasPrice, 10);
            transactionObject.gasPrice = networkGasPrice;
            console.log('sending transaction: ', transactionObject);
            resolve(wallet.sign(transactionObject));
          },
        },
      });
    });
    return signedTransaction;
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

    var data = ethers.utils.hexlify(transaction.data || '0x');
    var value = ethers.utils.hexlify(transaction.value || 0);

    return Promise.all([gasPricePromise, noncePromise, toPromise]).then(async function(results) {
      const signedTransaction = await self.sign({
        to: results[2],
        data: data,
        gasLimit: gasLimit,
        gasPrice: results[0],
        nonce: results[1],
        value: value,
        chainId: chainId
      });

      return self.provider.sendTransaction(signedTransaction).then(function(hash) {
        let transaction = ethers.Wallet.parseTransaction(signedTransaction);
        transaction.hash = hash;
        return transaction;
      });
    });
  };
}
