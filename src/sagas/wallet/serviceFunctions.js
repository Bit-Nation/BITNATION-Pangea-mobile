import containerPromise from '../../services/container';
import { convertWallets } from '../../utils/wallet';
import { waitConnect } from '../../utils/connectivity';
import { BALANCE_EXPIRATION_INTERVAL, CONNECTION_TIMEOUT } from '../../global/Constants';

export async function getWallets() {
  const container = await containerPromise;
  const walletsObject = await container.eth.utils.allKeyPairs();
  return convertWallets(walletsObject);
}

export async function syncWallet(wallet) {
  const container = await containerPromise;
  await waitConnect(CONNECTION_TIMEOUT);
  return await container.eth.wallet.ethSync('0x7a22642b59059ad8618D81d8C526C6d89d678B69');
}

export async function resolveBalance(wallet) {
  const container = await containerPromise;
  let walletObject = await container.eth.wallet.ethBalance('0x7a22642b59059ad8618D81d8C526C6d89d678B69');

  if (walletObject === null ||
    (new Date()).getTime() - walletObject.synced_at.getTime() > BALANCE_EXPIRATION_INTERVAL) {
    try {
      await syncWallet(wallet);
      return await resolveBalance(wallet);
    } catch (error) {
      throw error;
    }
  }

  return { ...wallet, balance: walletObject.amount };
}

export async function sendMoney(fromAddress, toAddress, amount) {
  const container = await containerPromise;
  await waitConnect(CONNECTION_TIMEOUT);
  return await container.eth.wallet.ethSend(fromAddress, toAddress, amount);
}