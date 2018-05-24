import {
  resolveWallet,
  getWalletIndex,
} from '../../../src/utils/wallet';

describe('Wallet services', () => {
  test('Resolve wallet', () => {
    const wallets = [
      {
        currency: 'ETH',
        ethAddress: '0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290',
        balance: null,
        name: 'Ethereum',
      },
      {
        currency: 'PAT',
        ethAddress: '0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290',
        balance: null,
        name: 'PAT',
      },
    ];

    const wallet = resolveWallet(wallets, 'ETH');
    expect(wallet).toEqual(wallets[0]);
  });

  test('Wallet index', () => {
    const wallets = [
      {
        currency: 'ETH',
        ethAddress: '0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290',
        balance: null,
        name: 'Ethereum',
      },
      {
        currency: 'PAT',
        ethAddress: '0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290',
        balance: null,
        name: 'PAT',
      },
    ];

    const index = getWalletIndex(wallets, '0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290');
    expect(index).toEqual(0);
  });
});
