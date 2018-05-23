import { compressMnemonic, decompressMnemonic } from '../../../src/utils/key';

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
