import _ from 'lodash';

export function resolveWallet(wallets, address) {
  return _.find(wallets, wallet => wallet.ethAddress === address);
}

export function convertWallets(wallets) {
  const walletsArray = [];
  wallets.forEach((value, key) =>
    walletsArray.push({
      key,
      value,
    }));

  return _.map(walletsArray, wallet => ({
    ethAddress: wallet.key,
    currency: 'ETH',
    balance: undefined,
    name: 'Ethereum',
  }));
}
