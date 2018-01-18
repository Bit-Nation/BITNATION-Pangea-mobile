import containerPromise from '../../services/container';
import { convertWallets } from '../../utils/wallet';
import { waitConnect } from '../../utils/connectivity';
import { CONNECTION_TIMEOUT } from '../../global/Constants';

export async function getWallets() {
  const container = await containerPromise;
  const walletsObject = await container.eth.utils.allKeyPairs();
  return convertWallets(walletsObject);
}

export async function syncWallet(wallet) {
  const container = await containerPromise;
  await waitConnect(CONNECTION_TIMEOUT);
  return await container.eth.wallet.ethSync(wallet.ethAddress);
}

export async function resolveBalance(wallet) {
  const container = await containerPromise;
  let balance = await container.eth.wallet.ethBalance(wallet.ethAddress);
  if (balance === null) {
    await syncWallet(wallet);
    return await resolveBalance(wallet);
  }

  return { ...wallet, balance };
}