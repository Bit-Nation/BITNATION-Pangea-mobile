// @flow

import { call, put, select, take } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import {
  accountsPresent, checkPasswordSaga, checkPinCodeSaga, getAccount, getCurrentAccount,
  getCurrentAccountId, listenForDatabaseUpdates, login as loginSaga, loginActionHandler, logout,
  saveEditingAccount as saveEditingAccountSaga, startAccountCreation,
  startRestoreAccountUsingMnemonic,
} from '../../../../src/sagas/accounts/sagas';
import defaultDB, { buildRandomPathDatabase } from '../../../../src/services/database';
import { convertFromDatabase, convertToDatabase } from '../../../../src/utils/mapping/account';
import { buildEmptyAccount } from '../../../../src/reducers/accounts';
import type { PartialAccount, Account } from '../../../../src/types/Account';
import { resetSettings } from '../../../../src/actions/settings';
import { createDatabaseUpdateChannel } from '../../../../src/sagas/database';
import {
  accountListUpdated, checkPassword, checkPinCode, currentAccountIdChanged, login,
  loginTaskUpdated, PERFORM_DEFERRED_LOGIN,
} from '../../../../src/actions/accounts';
import TaskBuilder from '../../../../src/utils/asyncTask';
import AccountsService from '../../../../src/services/accounts';
import { InvalidPasswordError, LoginFailedError } from '../../../../src/global/errors/accounts';
import { saveEditingAccount } from '../../../../src/actions/profile';

const partialAccountMock: PartialAccount = {
  ...buildEmptyAccount(),
  name: 'NAME',
  accountStore: 'ACCOUNT_STORE',
};

const accountMock: Account = ({
  ...buildEmptyAccount(),
  name: 'NAME',
  accountStore: 'ACCOUNT_STORE',
}: any); // Conversion through any because of flow issue - https://github.com/facebook/flow/issues/1511

test('getCurrentAccountId', () => {
  const gen = getCurrentAccountId();
  expect(gen.next().value).toEqual(select());
  expect(gen.next({ accounts: { currentAccountId: 'TEST' } }).value).toEqual('TEST');
});

describe('accountsPresent', () => {
  test('there are accounts', async () => {
    expect.assertions(2);

    const db = await buildRandomPathDatabase();
    db.write(() => {
      db.create('Account', convertToDatabase(partialAccountMock));
    });
    const gen = accountsPresent();
    expect(gen.next().value).toEqual(defaultDB);
    expect(gen.next(db).value).toEqual(true);
  });

  test('there is no accounts', async () => {
    expect.assertions(2);

    const db = await buildRandomPathDatabase();
    const gen = accountsPresent();
    expect(gen.next().value).toEqual(defaultDB);
    expect(gen.next(db).value).toEqual(false);
  });
});

describe('getAccount', () => {
  test('there is an account', async () => {
    expect.assertions(2);

    const db = await buildRandomPathDatabase();
    let realmAccount = null;
    db.write(() => {
      realmAccount = db.create('Account', convertToDatabase(partialAccountMock));
    });
    if (realmAccount == null) {
      throw new Error('Account was not created');
    }

    const gen = getAccount(partialAccountMock.id);
    expect(gen.next().value).toEqual(defaultDB);
    expect(gen.next(db).value).toMatchObject(realmAccount);
  });

  test('there is no such account', async () => {
    expect.assertions(2);

    const db = await buildRandomPathDatabase();
    const gen = getAccount('TEST');
    expect(gen.next().value).toEqual(defaultDB);
    expect(gen.next(db).value).toBeNull();
  });
});

describe('getCurrentAccount', () => {
  test('there is current account', () => {
    const gen = getCurrentAccount();
    expect(gen.next().value).toEqual(call(getCurrentAccountId));
    expect(gen.next(null).value).toBeNull();
  });

  test('there is no current account', () => {
    const gen = getCurrentAccount();
    expect(gen.next().value).toEqual(call(getCurrentAccountId));
    expect(gen.next('TEST').value).toEqual(call(getAccount, 'TEST'));
  });
});

test('listenForDatabaseUpdates', () => {
  const dbMock = {
    objects: jest.fn(),
  };
  const resultsMock = {};
  const channelMock = {
    name: 'channel',
    take: jest.fn(),
    close: jest.fn(),
  };
  const resultsUpdateMock = {
    collection: [{
      ...convertToDatabase(partialAccountMock),
    }],
  };

  const gen = listenForDatabaseUpdates();
  expect(gen.next().value).toEqual(defaultDB);
  expect(gen.next(dbMock).value).toEqual(call([dbMock, 'objects'], 'Account'));
  expect(gen.next(resultsMock).value).toEqual(call(createDatabaseUpdateChannel, resultsMock));

  expect(gen.next(channelMock).value).toEqual(take(channelMock));
  expect(gen.next(resultsUpdateMock).value)
    .toEqual(put(accountListUpdated([convertFromDatabase(resultsUpdateMock.collection[0])])));

  expect(gen.next().value).toEqual(take(channelMock));
  expect(gen.next(resultsUpdateMock).value)
    .toEqual(put(accountListUpdated([convertFromDatabase(resultsUpdateMock.collection[0])])));
});

test('startAccountCreation', () => {
  expect(startAccountCreation().next().value).toEqual(put(resetSettings()));
});

test('startRestoreAccountUsingMnemonic', () => {
  expect(startRestoreAccountUsingMnemonic().next().value).toEqual(put(resetSettings()));
});

test('loginActionHandler', () => {
  const actionMock = login('ID', 'PASSWORD');
  expect(loginActionHandler(actionMock).next().value).toEqual(call(loginSaga, { accountId: 'ID' }, 'PASSWORD', false));
});

describe('login', () => {
  test('login to existing account using account id', () => {
    const gen = cloneableGenerator(loginSaga)({ accountId: 'ID' }, 'PASSWORD');
    expect(gen.next().value).toEqual(put(loginTaskUpdated(TaskBuilder.pending())));
    expect(gen.next().value).toEqual(call(getAccount, 'ID'));
    expect(gen.next(accountMock).value).toEqual(call(AccountsService.login, 'ACCOUNT_STORE', 'PASSWORD'));

    // Invalid password
    const failureGen = gen.clone();
    expect(failureGen.next(false).value).toEqual(put(loginTaskUpdated(TaskBuilder.failure(new InvalidPasswordError()))));

    let last = failureGen.next();
    expect(last.value).toBeUndefined();
    expect(last.done).toBeTruthy();

    // Check failed
    const exceptionGen = gen.clone();
    expect(exceptionGen.throw('error').value).toEqual(put(loginTaskUpdated(TaskBuilder.failure(new LoginFailedError()))));

    last = exceptionGen.next();
    expect(last.value).toBeUndefined();
    expect(last.done).toBeTruthy();

    // successful path
    expect(gen.next(true).value).toEqual(put(currentAccountIdChanged('ID')));
    expect(gen.next().value).toEqual(put(loginTaskUpdated(TaskBuilder.success())));
  });

  test('login to new account using account store', () => {
    const gen = cloneableGenerator(loginSaga)({ accountId: 'ID', accountStore: 'ACCOUNT_STORE' }, 'PASSWORD', true);
    expect(gen.next().value).toEqual(put(loginTaskUpdated(TaskBuilder.pending())));
    expect(gen.next().value).toEqual(call(AccountsService.login, 'ACCOUNT_STORE', 'PASSWORD'));

    // Invalid password
    const failureGen = gen.clone();
    expect(failureGen.next(false).value).toEqual(put(loginTaskUpdated(TaskBuilder.failure(new InvalidPasswordError()))));

    let last = failureGen.next();
    expect(last.value).toBeUndefined();
    expect(last.done).toBeTruthy();

    // Check failed
    const exceptionGen = gen.clone();
    expect(exceptionGen.throw('error').value).toEqual(put(loginTaskUpdated(TaskBuilder.failure(new LoginFailedError()))));

    last = exceptionGen.next();
    expect(last.value).toBeUndefined();
    expect(last.done).toBeTruthy();

    // successful path
    expect(gen.next(true).value).toEqual(take(PERFORM_DEFERRED_LOGIN));
    expect(gen.next().value).toEqual(put(currentAccountIdChanged('ID')));
    expect(gen.next().value).toEqual(put(loginTaskUpdated(TaskBuilder.success())));

    last = gen.next();
    expect(last.value).toBeUndefined();
    expect(last.done).toBeTruthy();
  });
});

test('logout', () => {
  const gen = logout();
  expect(gen.next().value).toEqual(call(AccountsService.logout));
  expect(gen.next().value).toEqual(put(currentAccountIdChanged(null)));

  const last = gen.next();
  expect(last.value).toBeUndefined();
  expect(last.done).toBeTruthy();
});

test('saveAccount', async () => {
  expect.assertions(5);

  const db = await buildRandomPathDatabase();
  let dbAccount = null;
  db.write(() => {
    dbAccount = db.create('Account', convertToDatabase(partialAccountMock));
  });

  const changedAccount: Account = {
    ...accountMock,
    name: 'CHANGED NAME',
  };
  const mockAction = saveEditingAccount(changedAccount);

  const gen = cloneableGenerator(saveEditingAccountSaga)(mockAction);
  expect(gen.next().value).toEqual(call(getCurrentAccount));

  const noAccountGen = gen.clone();
  expect(noAccountGen.next(null).done).toBeTruthy();

  expect(gen.next(dbAccount).value).toEqual(defaultDB);
  expect(gen.next(db).done).toBeTruthy();

  expect(db.objects('Account')[0]).toMatchObject({
    ...dbAccount,
    name: 'CHANGED NAME',
  });
});

test('checkPinCodeSaga', () => {
  const mockCallback = jest.fn();
  const mockAction = checkPinCode('PIN_CODE', 'ID', mockCallback);
  expect(checkPinCodeSaga(mockAction).next().value)
    .toEqual(call(checkPasswordSaga, checkPassword('PIN_CODE', 'ID', mockCallback)));
});
