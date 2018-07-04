import { updatePartByKeyPath } from '../../../../src/utils/dApps/updates';

test('updatePartByKeyPath', () => {
  expect(updatePartByKeyPath({}, 'plain', 'TEST_VALUE'))
    .toEqual({
      plain: 'TEST_VALUE',
    });

  expect(updatePartByKeyPath({}, 'some.depth', 'TEST_VALUE'))
    .toEqual({
      some: {
        depth: 'TEST_VALUE',
      },
    });

  expect(updatePartByKeyPath({
    something: 'is here',
    some: {
      has: 'information',
      depth: 'some another value',
    },
  }, 'some.depth', 'TEST_VALUE'))
    .toEqual({
      something: 'is here',
      some: {
        depth: 'TEST_VALUE',
        has: 'information',
      },
    });
});
