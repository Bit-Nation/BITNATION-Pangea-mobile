import _ from 'lodash';

export function resolveWallet(wallets, address) {
  return _.find(wallets, (wallet) => wallet.ethAddress === address);
}

export function convertWallets(wallets) {
  const walletsArray = _.map(Object.keys(wallets), (key) => {
    return {
      key: key,
      value: wallets[key],
    };
  });
  return _.map(walletsArray, (wallet) => {
    return {
      ethAddress: wallet.key,
      currency: 'ETH',
      balance: undefined,
      name: 'Ethereum',
    };
  });
}