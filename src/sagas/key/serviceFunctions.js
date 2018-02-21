import containerPromise from '../../services/container';
import { compressMnemonic } from '../../utils/key';

export async function createPrivateKey() {
  const container = await containerPromise;
  return await container.eth.utils.createPrivateKey();
}

export async function privateKeyToMnemonic(privateKey) {
  const container = await containerPromise;
  return await container.eth.utils.privateKeyToMnemonic(privateKey);
}

export async function mnemonicToPrivateKey(mnemonic) {
  const container = await containerPromise;
  return await container.eth.utils.mnemonicToPrivateKey(compressMnemonic(mnemonic));
}

export async function savePrivateKey(privateKey) {
  const container = await containerPromise;
  return await container.eth.utils.savePrivateKey(privateKey);
}

export async function verifyMnemonic(mnemonic) {
  const container = await containerPromise;
  return container.eth.utils.mnemonicValid(compressMnemonic(mnemonic));
}

export async function removePrivateKey(address) {
  const container = await containerPromise;
  return container.eth.utils.deletePrivateKey(address);
}
