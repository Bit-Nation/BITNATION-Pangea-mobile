import { roundEth, shortEthAddress } from '../../../src/utils/formatters';

test('roundEth', () => {
  expect(roundEth('0.03452345234')).toBe('0.03452');
});

test('shortEthAddress', () => {
  expect(shortEthAddress('0x6e5d44060fac77c126a75fa1f7bfaf224ab52c1e')).toBe('0x6e5...52c1e');
});
