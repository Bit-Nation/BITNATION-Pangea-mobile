// @flow

import {
  startAccountEditing,
  changeEditingAccount,
  cancelAccountEditing,
  doneAccountEditing,
  saveEditingAccount,
  START_ACCOUNT_EDITING,
  CHANGE_EDITING_ACCOUNT,
  CANCEL_ACCOUNT_EDITING,
  DONE_ACCOUNT_EDITING,
  SAVE_EDITING_ACCOUNT,
} from '../../../src/actions/profile';

describe('profile action creators', () => {
  const accountMock = {
    id: 'ID',
    name: 'Name',
    accountStore: 'Account store',
    networkType: 'main',
    avatar: null,
    location: null,
    confirmedMnemonic: false,
  };

  test('startAccountEditing', () => {
    expect(startAccountEditing(accountMock)).toEqual({
      type: START_ACCOUNT_EDITING,
      account: accountMock,
    });
  });

  test('changeEditingAccount', () => {
    const account = {
      ...accountMock,
      name: 'CHANGED NAME',
    };
    expect(changeEditingAccount(account)).toEqual({
      type: CHANGE_EDITING_ACCOUNT,
      account,
    });
  });

  test('cancelAccountEditing', () => {
    expect(cancelAccountEditing()).toEqual({
      type: CANCEL_ACCOUNT_EDITING,
    });
  });

  test('doneAccountEditing', () => {
    expect(doneAccountEditing()).toEqual({
      type: DONE_ACCOUNT_EDITING,
    });
  });

  test('saveAccount', () => {
    expect(saveEditingAccount(accountMock)).toEqual({
      type: SAVE_EDITING_ACCOUNT,
      account: accountMock,
    });
  });
});
