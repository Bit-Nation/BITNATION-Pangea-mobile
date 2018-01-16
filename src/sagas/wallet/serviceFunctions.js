import containerPromise from '../../services/container';

export async function getWallets() {
  const container = await containerPromise;
  return await container.panthalassa.ethereum.utils.allKeyPairs();
}

export async function syncWallet(wallet) {
  // @todo Add ethSync method, once fixed
}

export async function resolveBalance(wallet) {
  const container = await containerPromise;
  let balance = await container.panthalassa.ethereum.wallet.ethBalance(wallet.ethAddress);
  if (!balance) {
    await syncWallet(wallet);
    return await resolveBalance(wallet);
  }

  return { ...wallet, balance };
}