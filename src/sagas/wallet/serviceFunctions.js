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
  // @todo Add ethBalance method, once fixed
  let balance = 0;
  if (!balance) {
    await syncWallet(wallet);
    return await resolveBalance(wallet);
  }

  return { ...wallet, balance };
}