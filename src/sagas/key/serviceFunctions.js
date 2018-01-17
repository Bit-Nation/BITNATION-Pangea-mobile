import containerPromise from '../../services/container';

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
  return await container.eth.utils.mnemonicToPrivateKey(mnemonic);
}

export async function savePrivateKey(privateKey) {
  const container = await containerPromise;
  return await container.eth.utils.savePrivateKey(privateKey);
}
