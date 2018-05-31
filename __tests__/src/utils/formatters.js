import { prettyWalletBalance, roundEth, shortEthAddress } from '../../../src/utils/formatters';

describe('roundEth', () => {
  test('random', () => {
    expect(roundEth('0.03452345234')).toBe('0.03452');
    expect(roundEth('0.0562134342')).toBe('0.05621');
    expect(roundEth('0.1325154')).toBe('0.13252');
    expect(roundEth('5.79596543')).toBe('5.79597');
    expect(roundEth('2.5193883')).toBe('2.51939');
  });
  test('short', () => {
    expect(roundEth('0.03')).toBe('0.03');
    expect(roundEth('15.0003')).toBe('15.0003');
    expect(roundEth('5')).toBe('5');
    expect(roundEth('3.00')).toBe('3');
    expect(roundEth('0.02152')).toBe('0.02152');
  });
  test('rounding', () => {
    expect(roundEth('0.000001')).toBe('0');
    expect(roundEth('1.999999')).toBe('2');
  });
});

describe('prettyWalletBalance', () => {
  const unsyncedWallet = {
    ethAddress: '0xtestAddress',
    currency: 'ETH',
    balance: null,
    name: 'Test wallet',
  };
  const syncedWallet = {
    ethAddress: '0xtestAddress',
    currency: 'ETH',
    balance: '0.12345678901',
    name: 'Test wallet',
  };
  const failedWallet = {
    ethAddress: '0xtestAddress',
    currency: 'ETH',
    balance: null,
    name: 'Test wallet',
    synchronizationError: 'Error',
  };

  test('empty suffix', () => {
    expect(prettyWalletBalance(unsyncedWallet, 'ETH')).toBe('Updating');
    expect(prettyWalletBalance(syncedWallet, 'ETH')).toBe('0.12346 ETH');
    expect(prettyWalletBalance(failedWallet, 'ETH')).toBe('Update failed');
  });

  test('custom success suffix', () => {
    expect(prettyWalletBalance(unsyncedWallet, 'ETH', ' available')).toBe('Updating');
    expect(prettyWalletBalance(syncedWallet, 'ETH', ' available')).toBe('0.12346 ETH available');
    expect(prettyWalletBalance(failedWallet, 'ETH', ' available')).toBe('Update failed');
  });
});

test('shortEthAddress', () => {
  expect(shortEthAddress('0x6e5d44060fac77c126a75fa1f7bfaf224ab52c1e')).toBe('0x6e5...52c1e');
});

