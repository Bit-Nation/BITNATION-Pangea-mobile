import {
  accountListUpdated,
  changeCreatingAccountField,
  checkPassword,
  checkPinCode,
  currentAccountIdChanged,
  login,
  loginTaskUpdated,
  logout,
  performDeferredLogin,
  saveCreatingAccount,
  savePassword,
  savePinCode,
  startAccountCreation,
  startRestoreAccountUsingMnemonic,
  ACCOUNTS_LIST_UPDATED,
  CHANGE_CREATING_ACCOUNT_FIELD,
  CHECK_PASSWORD,
  CHECK_PIN_CODE,
  CURRENT_ACCOUNT_ID_CHANGED,
  LOGIN,
  LOGIN_TASK_UPDATED,
  LOGOUT,
  PERFORM_DEFERRED_LOGIN,
  SAVE_CREATING_ACCOUNT,
  SAVE_PASSWORD,
  SAVE_PIN_CODE,
  START_ACCOUNT_CREATION,
  START_RESTORE_ACCOUNT_USING_MNEMONIC,
} from '../../../src/actions/accounts';

describe('accounts action creators', () => {
  test('accountListUpdated', () => {
    const accountMock = {
      id: 'ID',
      name: 'Name',
      accountStore: 'Account store',
      networkType: 'main',
    };

    expect(accountListUpdated([accountMock, accountMock])).toEqual({
      type: ACCOUNTS_LIST_UPDATED,
      accounts: [accountMock, accountMock],
    });
  });

  test('currentAccountIdChanged', () => {
    expect(currentAccountIdChanged('ID')).toEqual({
      type: CURRENT_ACCOUNT_ID_CHANGED,
      currentAccountId: 'ID',
    });
  });

  test('login', () => {
    expect(login('ID', 'PASSWORD', false)).toEqual({
      type: LOGIN,
      accountId: 'ID',
      password: 'PASSWORD',
      deferred: false,
    });
  });

  test('performDeferredLogin', () => {
    expect(performDeferredLogin()).toEqual({
      type: PERFORM_DEFERRED_LOGIN,
    });
  });

  test('loginTaskUpdated', () => {
    expect(loginTaskUpdated({ inProgress: false, result: null, error: null })).toEqual({
      type: LOGIN_TASK_UPDATED,
      loginTask: { inProgress: false, result: null, error: null },
    });
  });

  test('logout', () => {
    expect(logout()).toEqual({
      type: LOGOUT,
    });
  });

  test('startAccountCreation', () => {
    expect(startAccountCreation()).toEqual({
      type: START_ACCOUNT_CREATION,
    });
  });

  test('checkPinCode', () => {
    const callbackMock = jest.fn();
    expect(checkPinCode('PIN_CODE', 'ID', callbackMock)).toEqual({
      type: CHECK_PIN_CODE,
      accountId: 'ID',
      pinCode: 'PIN_CODE',
      callback: callbackMock,
    });
  });

  test('checkPassword', () => {
    const callbackMock = jest.fn();
    expect(checkPassword('PASSWORD', 'ID', callbackMock)).toEqual({
      type: CHECK_PASSWORD,
      accountId: 'ID',
      password: 'PASSWORD',
      callback: callbackMock,
    });
  });

  test('savePinCode', () => {
    const callbackMock = jest.fn();
    expect(savePinCode('PIN_CODE', 'ID', callbackMock)).toEqual({
      type: SAVE_PIN_CODE,
      accountId: 'ID',
      pinCode: 'PIN_CODE',
      callback: callbackMock,
    });
  });

  test('savePassword', () => {
    const callbackMock = jest.fn();
    expect(savePassword('PASSWORD', 'ID', callbackMock)).toEqual({
      type: SAVE_PASSWORD,
      accountId: 'ID',
      password: 'PASSWORD',
      callback: callbackMock,
    });
  });

  test('changeCreatingAccountField', () => {
    expect(changeCreatingAccountField('FIELD', 'VALUE')).toEqual({
      type: CHANGE_CREATING_ACCOUNT_FIELD,
      field: 'FIELD',
      value: 'VALUE',
    });
  });

  test('saveCreatingAccount', () => {
    const callbackMock = jest.fn();
    expect(saveCreatingAccount(callbackMock)).toEqual({
      type: SAVE_CREATING_ACCOUNT,
      callback: callbackMock,
    });
  });

  test('startRestoreAccountUsingMnemonic', () => {
    const mnemonic = ['a', 'a', 'a', 'a', 'a', 'a'];
    expect(startRestoreAccountUsingMnemonic(mnemonic)).toEqual({
      type: START_RESTORE_ACCOUNT_USING_MNEMONIC,
      mnemonic,
    });
  });
});
