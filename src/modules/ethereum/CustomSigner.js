// @flow
import ethers from 'ethers';
import { Navigation } from 'react-native-navigation';

import WebSocketProvider from './WebSocketProvider';
import { screen } from 'pangea-common-reactnative/Screens';
import { CancelledError } from 'pangea-common/errors/common';
import { normalizeHexValue } from '@pangea/key/key-utils';
import { DEFAULT_GAS_LIMIT } from 'pangea-common/Constants';

/**
 * @desc Custom signer for ethereum RPC
 * @example
 * const customSigner = CustomSigner(PRIVATE_KEY, 'homestead')
 *
 * @param {string} privateKey Private key of wallet
 * @param {string} provider name of network
 * @param {string} app name of application creating this signer
 * @return {object} custom signer with wallet functions
 */
export default function CustomSigner(privateKey: string, provider: string, app: string) {
  const wallet = new ethers.Wallet(privateKey);
  this.provider = new WebSocketProvider(provider);
  this.address = wallet.address;
  this.getBalance = wallet.getBalance;
  this.estimateGas = wallet.estimateGas;
  this.getTransactionCount = wallet.getTransaction;
  this.defaultGasLimit = DEFAULT_GAS_LIMIT;
  this.sign = async (transaction) => {
    const transactionObject = transaction;
    try {
      let estimate;
      // If no to address is specified, like in the case of contract creation, set a default one to the wallet address
      // Issue caused by 3.x of ethers.js, see posted issue here: https://github.com/ethers-io/ethers.js/issues/212
      if (transactionObject.to === undefined) {
        transactionObject.to = this.address;
        estimate = await this.estimateGas(transactionObject);
        transactionObject.to = undefined;
      } else {
        estimate = await this.estimateGas(transactionObject);
      }
      let { gasLimit } = transaction;
      if (gasLimit != null) {
        gasLimit = gasLimit.toString();// get gas limit if transaction has it
      } else if (estimate != null) {
        gasLimit = estimate.toString();// get gas limit from ether.js service https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_estimategas
      } else {
        gasLimit = this.defaultGasLimit; // get gas limit from default value
      }
      const signedTransaction = await new Promise((resolve, reject) => {
        Navigation.showModal({
          ...screen('CONFIRMATION_SCREEN'),
          passProps: {
            onFail: (error) => {
              reject(error);
            },
            onSuccess: (gasPrice, gasLimitOnSuccess) => {
              // Here we have gasPrice which is in wei, so we need to convert it into gwei.
              transactionObject.gasPrice = ethers.utils.parseUnits(gasPrice.toString(), 'gwei');
              transactionObject.gasLimit = ethers.utils.bigNumberify(gasLimitOnSuccess);
              resolve(wallet.sign(transactionObject));
            },
            to: transactionObject.to,
            from: this.address,
            amount: transactionObject.value,
            estimate: estimate.toString(),
            app,
            gasLimit,
          },
        });
      });
      return signedTransaction;
    } catch (e) {
      console.log('Sign transaction fail with error: ', e);
      throw e;
    }
  };

  this.sendTransaction = (transaction) => {
    if (!this.provider) {
      throw new Error('missing provider');
    }

    if (!transaction || typeof (transaction) !== 'object') {
      throw new Error('invalid transaction object');
    }

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

    const data = ethers.utils.hexlify(normalizeHexValue(transaction.data || ''));
    const value = ethers.utils.hexlify(transaction.value || 0);
    return Promise.all([gasPricePromise, noncePromise, toPromise]).then(async (results) => {
      const signedTransaction = await self.sign({
        to: results[2],
        data,
        gasLimit: transaction.gasLimit,
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
    }).catch((error) => {
      if (error.isCancelled === true) {
        throw new CancelledError();
      }
      if (error.toString().indexOf('invalid') !== -1) {
        throw new Error('insufficient funds');
      }
      throw error;
    });
  };
}
