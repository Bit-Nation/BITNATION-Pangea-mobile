import { compressMnemonic, decompressMnemonic, normalizeHexValue } from '../../../src/utils/key';

test('compressMnemonic', () => {
  expect(compressMnemonic([
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'ij', 'k', 'l', 'mn', 'o', 'pqr', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'one', 'more',
  ])).toBe('a b c d e f g h ij k l mn o pqr s t u v w x y z one more');
});

test('decompressMnemonic', () => {
  expect(decompressMnemonic('a b c d e f g h ij k l mn o pqr s t u v w x y z one more'))
    .toEqual([
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'ij', 'k', 'l', 'mn', 'o', 'pqr', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'one', 'more',
    ]);
});

test('normalizeHexValue', () => {
  expect(normalizeHexValue('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160'))
    .toEqual('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
  expect(normalizeHexValue('efc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160'))
    .toEqual('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
});
