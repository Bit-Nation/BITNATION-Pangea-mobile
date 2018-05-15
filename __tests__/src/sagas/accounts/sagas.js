// @flow

import { buildEmptyAccount } from '../../../../src/reducers/accounts';

describe('buildEmptyAccount', () => {
  test('generates empty account', () => {
    const account = buildEmptyAccount();
    expect(account.id).toBeDefined();
    expect(account.name).toBeNull();
    expect(account.accountStore).toBeNull();
    expect(account.networkType).toEqual('main');
    expect(account.location).toBeNull();
    expect(account.avatar).toBeNull();
  });

  test('generates different ids', () => {
    expect(buildEmptyAccount().id).not.toEqual(buildEmptyAccount().id);
  });
});
