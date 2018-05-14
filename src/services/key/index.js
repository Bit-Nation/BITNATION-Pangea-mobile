// @flow
/* eslint-disable */

import containerPromise from '../../services/container';
import { compressMnemonic } from '../../utils/key';

export default class KeyService {
  static async createPrivateKey() {
    const container = await containerPromise;
    return await container.eth.utils.createPrivateKey();
  }

  static async privateKeyToMnemonic(privateKey) {
    const container = await containerPromise;
    return await container.eth.utils.privateKeyToMnemonic(privateKey);
  }

  static async mnemonicToPrivateKey(mnemonic) {
    const container = await containerPromise;
    return await container.eth.utils.mnemonicToPrivateKey(compressMnemonic(mnemonic));
  }

  static async savePrivateKey(privateKey) {
    const container = await containerPromise;
    return await container.eth.utils.savePrivateKey(privateKey);
  }

  static async verifyMnemonic(mnemonic) {
    const container = await containerPromise;
    return container.eth.utils.mnemonicValid(compressMnemonic(mnemonic));
  }

  static async removePrivateKey(address) {
    const container = await containerPromise;
    return container.eth.utils.deletePrivateKey(address);
  }
}
