import {
  resolveWallet,
  getWalletIndex,
} from '../../../src/utils/wallet';

describe('Wallet services', () => {
  const wallets = [
    {
      currency: 'ETH',
      ethAddress: '0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290',
      balance: null,
      name: 'Ethereum',
    },
    {
      currency: 'XPAT',
      ethAddress: '0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290',
      balance: null,
      name: 'XPAT',
    },
  ];

  test('Resolve wallet', () => {
    const wallet = resolveWallet(wallets, 'ETH');
    expect(wallet).toEqual(wallets[0]);
  });

  test('Resolve wallet should fail', () => {
    const wallet = resolveWallet(wallets, 'BTC');
    expect(wallet).toBeNull();
  });

  test('Wallet index', () => {
    const index = getWalletIndex(wallets, '0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290');
    expect(index).toEqual(0);
  });

  test('Wallet index does not exist', () => {
    const index = getWalletIndex(wallets, '0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc291');
    expect(index).toBeNull();
  });
});
