// @flow

import { call, put, race, select, take } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import {
  accountsPresent, checkPasswordSaga, checkPinCodeSaga, getAccount, getCurrentAccount,
  getCurrentAccountId, listenForDatabaseUpdates, login as loginSaga, loginActionHandler, logout, cancelLogin,
  saveEditingAccount as saveEditingAccountSaga, savePasswordSaga, savePinCodeSaga, startAccountCreation,
  startRestoreAccountUsingMnemonic, saveCreatingAccount as saveCreatingAccountSaga, currentAccountBasedUpdate,
  startAccountUpdateListening, saveMnemonicConfirmed, getAccounts, handleLoginProcess,
  validateMnemonicWithAccount as validateMnemonicWithAccountSaga, validateMnemonicWithAccountActionHandler,
} from '../../accounts-sagas/sagas';
import defaultDB, { buildRandomPathDatabase } from '@pangea/database';
import { convertFromDatabase, convertToDatabase } from '../../account-utils';
import { buildEmptyAccount } from '../../accounts-reducers';
import type { PartialAccount, Account } from 'pangea-common/types/accounts-types';
import { resetSettings } from '@pangea/settings/settings-actions';
import { createDatabaseUpdateChannel } from '@pangea/database/database-sagas';
import {
  accountListUpdated, changeCreatingAccountField, checkPassword, checkPinCode, CURRENT_ACCOUNT_ID_CHANGED,
  currentAccountIdChanged, login,
  loginTaskUpdated, mnemonicConfirmed, PERFORM_DEFERRED_LOGIN, saveCreatingAccount, savePassword, savePinCode,
  setCurrentAccountIdentityKey,
  validateMnemonicWithAccount, CANCEL_LOGIN,
} from '../../accounts-actions';
import TaskBuilder from 'pangea-common/utils/asyncTask';
import AccountsService from '../../accounts-services';
import ChatService from '@pangea/chat/chat-service';
import { InvalidPasswordError, LoginFailedError } from 'pangea-common/errors/accounts';
import { cancelAccountEditing, saveEditingAccount } from '@pangea/profile/profile-actions';
import { fetchAllChats } from '@pangea/chat/chat-actions';

const partialAccountMock: PartialAccount = {
  ...buildEmptyAccount(),
  name: 'NAME',
  accountStore: 'ACCOUNT_STORE',
};

const version = '1.0.7';

const accountMock: Account = ({
  ...buildEmptyAccount(),
  name: 'NAME',
  accountStore: 'ACCOUNT_STORE',
  profileImage: 'PROFILE_IMAGE',
}: any); // Conversion through any because of flow issue - https://github.com/facebook/flow/issues/1511

test('currentAccountBasedUpdate', () => {
  const resultsBuilderMock = jest.fn();
  const onChangeMock = jest.fn();
  const gen = currentAccountBasedUpdate(resultsBuilderMock, onChangeMock);

  const expectedRace = race({
    task: call(startAccountUpdateListening, resultsBuilderMock, onChangeMock),
    cancel: take(CURRENT_ACCOUNT_ID_CHANGED),
  });

  expect(gen.next().value).toEqual(expectedRace);
  expect(gen.next().value).toEqual(expectedRace);
  expect(gen.next().value).toEqual(expectedRace);
});

test('startAccountUpdateListening', async () => {
  expect.assertions(11);

  const resultsBuilderMock = jest.fn();
  const onChangeMock = jest.fn();
  const gen = cloneableGenerator(startAccountUpdateListening)(resultsBuilderMock, onChangeMock);
  expect(gen.next().value).toEqual(call(getCurrentAccountId));
  expect(gen.next('ID').value).toEqual(defaultDB);

  const db = await buildRandomPathDatabase();
  expect(gen.next(db).value).toEqual(call(resultsBuilderMock, db, 'ID'));

  const failureGen = gen.clone();
  expect(failureGen.next(null).value).toEqual(take('HANG_FOREVER'));
  const last = failureGen.next();
  expect(last.value).toBeUndefined();
  expect(last.done).toBeTruthy();

  const resultsMock = {
    collection: [accountMock],
    changes: ['CHANGES'],
  };
  const channelMock = {
    name: 'channel',
    take: jest.fn(),
    close: jest.fn(),
  };
  expect(gen.next(resultsMock).value).toEqual(call(createDatabaseUpdateChannel, resultsMock));
  expect(gen.next(channelMock).value).toEqual(take(channelMock));
  expect(gen.next(resultsMock).value).toEqual(call(onChangeMock, resultsMock.collection, resultsMock.changes));
  expect(gen.next().value).toEqual(take(channelMock));
  expect(gen.next(resultsMock).value).toEqual(call(onChangeMock, resultsMock.collection, resultsMock.changes));
});

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
      db.create('Account', convertToDatabase(partialAccountMock, version));
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
      realmAccount = db.create('Account', convertToDatabase(partialAccountMock, version));
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
      ...convertToDatabase(partialAccountMock, version),
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

test('validateMnemonicWithAccountActionHandler', () => {
  const mockCallback = jest.fn();
  const actionMock = validateMnemonicWithAccount('ID', mockCallback);
  expect(validateMnemonicWithAccountActionHandler(actionMock).next().value).toEqual(call(validateMnemonicWithAccountSaga, { accountId: 'ID' }, mockCallback));
});

describe('login', () => {
  test('handleLoginProcess to existing account using account id', () => {
    const gen = cloneableGenerator(handleLoginProcess)({ accountId: 'ID' }, 'PASSWORD');
    expect(gen.next().value).toEqual(put(loginTaskUpdated(TaskBuilder.pending())));
    expect(gen.next().value).toEqual(call(getAccount, 'ID'));
    expect(gen.next(accountMock).value).toEqual(call(
      AccountsService.login,
      'ACCOUNT_STORE',
      {
        name: 'NAME',
        avatar: 'PROFILE_IMAGE',
        location: null,
      },
      'PASSWORD',
      'main',
    ));

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
    expect(gen.next(true).value).toEqual(call(ChatService.getPublicKey));
    expect(gen.next('identityKey').value).toEqual(put(setCurrentAccountIdentityKey('identityKey')));
    expect(gen.next().value).toEqual(put(currentAccountIdChanged('ID')));
    expect(gen.next().value).toEqual(put(loginTaskUpdated(TaskBuilder.success())));
    expect(gen.next().value).toEqual(put(fetchAllChats()));
  });

  test('handleLoginProcess to new account using account store', () => {
    const gen = cloneableGenerator(handleLoginProcess)({ accountId: 'ID', accountStore: 'ACCOUNT_STORE' }, 'PASSWORD', true);

    expect(gen.next().value).toEqual(take(PERFORM_DEFERRED_LOGIN));

    expect(gen.next().value).toEqual(put(loginTaskUpdated(TaskBuilder.pending())));
    expect(gen.next().value).toEqual(select(getAccounts));
    expect(gen.next({ creatingAccount: accountMock }).value).toEqual(call(
      AccountsService.login,
      'ACCOUNT_STORE',
      {
        name: 'NAME',
        avatar: null,
        location: null,
      },
      'PASSWORD',
      'main',
    ));

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
    expect(gen.next(true).value).toEqual(call(ChatService.getPublicKey));
    expect(gen.next('identityKey').value).toEqual(put(setCurrentAccountIdentityKey('identityKey')));
    expect(gen.next().value).toEqual(put(currentAccountIdChanged('ID')));
    expect(gen.next().value).toEqual(put(loginTaskUpdated(TaskBuilder.success())));
    expect(gen.next().value).toEqual(put(fetchAllChats()));

    last = gen.next();
    expect(last.value).toBeUndefined();
    expect(last.done).toBeTruthy();
  });

  test('login', () => {
    const userInfo = { accountId: 'ID', accountStore: 'ACCOUNT_STORE' };
    const pass = 'PASSWORD';
    const gen = cloneableGenerator(loginSaga)(userInfo, pass, true);
    const expectedRace = race({
      task: call(handleLoginProcess, userInfo, pass, true),
      backPress: take(CANCEL_LOGIN),
    });
    expect(gen.next().value).toEqual(expectedRace);
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

test('cancelLogin', () => {
  const gen = cancelLogin();
  expect(gen.next().value).toEqual(put(loginTaskUpdated(TaskBuilder.empty())));
});

test('saveAccount', async () => {
  expect.assertions(5);

  const db = await buildRandomPathDatabase();
  let dbAccount = null;
  db.write(() => {
    dbAccount = db.create('Account', convertToDatabase(partialAccountMock, version));
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

test('checkPasswordSaga', () => {
  const mockCallback = jest.fn();
  const mockAction = checkPassword('PASSWORD', 'ID', mockCallback);
  const gen = cloneableGenerator(checkPasswordSaga)(mockAction);
  expect(gen.next().value).toEqual(call(getAccount, 'ID'));
  expect(gen.next(accountMock).value)
    .toEqual(call(
      AccountsService.checkPasscode,
      'ACCOUNT_STORE',
      {
        name: 'NAME',
        avatar: 'PROFILE_IMAGE',
        location: null,
      },
      'PASSWORD',
      'main',
    ));

  // Invalid password
  const failureGen = gen.clone();
  expect(failureGen.next(false).value).toEqual(call(mockCallback, false));

  let last = failureGen.next();
  expect(last.value).toBeUndefined();
  expect(last.done).toBeTruthy();

  // Check failed
  const exceptionGen = gen.clone();
  expect(exceptionGen.throw('error').value).toEqual(call(mockCallback, false));

  last = exceptionGen.next();
  expect(last.value).toBeUndefined();
  expect(last.done).toBeTruthy();

  // Successful path

  expect(gen.next(true).value).toEqual(call(mockCallback, true));
  last = gen.next();
  expect(last.value).toBeUndefined();
  expect(last.done).toBeTruthy();
});

test('savePinCodeSaga', () => {
  const mockCallback = jest.fn();
  const mockAction = savePinCode('PIN_CODE', 'ID', mockCallback);
  expect(savePinCodeSaga(mockAction).next().value)
    .toEqual(call(savePasswordSaga, savePassword('PIN_CODE', 'ID', mockCallback)));
});

describe('savePasswordSaga', () => {
  test('save password for new account', () => {
    const mockCallback = jest.fn();
    const mockAction = savePassword('PASSWORD', 'ID', mockCallback);

    const gen = cloneableGenerator(savePasswordSaga)(mockAction);
    expect(gen.next().value).toEqual(select());
    expect(gen.next({
      accounts: {
        currentCreation: { type: 'create' },
      },
    }).value).toEqual(call(AccountsService.createAccountStore, 'PASSWORD'));

    // Check failed
    const exceptionGen = gen.clone();
    expect(exceptionGen.throw('error').value).toEqual(call(mockCallback, false));

    let last = exceptionGen.next();
    expect(last.value).toBeUndefined();
    expect(last.done).toBeTruthy();

    expect(gen.next('ACCOUNT_STORE').value).toEqual(put(changeCreatingAccountField('accountStore', 'ACCOUNT_STORE')));
    expect(gen.next().value).toEqual(call(mockCallback, true));
    expect(gen.next().value).toEqual(call(
      loginSaga,
      {
        accountId: 'ID',
        accountStore: 'ACCOUNT_STORE',
      },
      'PASSWORD',
      true,
    ));

    last = gen.next();
    expect(last.value).toBeUndefined();
    expect(last.done).toBeTruthy();
  });

  test('save password for account restore from mnemonic', () => {
    const mockCallback = jest.fn();
    const mockAction = savePassword('PASSWORD', 'ID', mockCallback);

    const gen = cloneableGenerator(savePasswordSaga)(mockAction);
    expect(gen.next().value).toEqual(select());
    expect(gen.next({
      accounts: {
        currentCreation: {
          type: 'restore',
          mnemonic: ['a'],
        },
      },
    }).value).toEqual(call(AccountsService.restoreAccountStore, ['a'], 'PASSWORD'));

    // Check failed
    const exceptionGen = gen.clone();
    expect(exceptionGen.throw('error').value).toEqual(call(mockCallback, false));

    let last = exceptionGen.next();
    expect(last.value).toBeUndefined();
    expect(last.done).toBeTruthy();

    expect(gen.next('ACCOUNT_STORE').value).toEqual(put(changeCreatingAccountField('accountStore', 'ACCOUNT_STORE')));
    expect(gen.next().value).toEqual(call(mockCallback, true));
    expect(gen.next().value).toEqual(call(
      loginSaga,
      {
        accountId: 'ID',
        accountStore: 'ACCOUNT_STORE',
      },
      'PASSWORD',
      true,
    ));

    last = gen.next();
    expect(last.value).toBeUndefined();
    expect(last.done).toBeTruthy();
  });

  test('change password for existing account', async () => {
    expect.assertions(11);

    const mockCallback = jest.fn();
    const mockAction = savePassword('PASSWORD', 'ID', mockCallback);

    const gen = cloneableGenerator(savePasswordSaga)(mockAction);
    expect(gen.next().value).toEqual(select());
    expect(gen.next({
      accounts: { currentCreation: null },
    }).value).toEqual(call(AccountsService.exportAccountStore, 'PASSWORD'));

    // Check failed
    const exceptionGen = gen.clone();
    expect(exceptionGen.throw('error').value).toEqual(call(mockCallback, false));

    let last = exceptionGen.next();
    expect(last.value).toBeUndefined();
    expect(last.done).toBeTruthy();

    const db = await buildRandomPathDatabase();
    let dbAccount = null;
    db.write(() => {
      dbAccount = db.create('Account', convertToDatabase(partialAccountMock, version));
    });

    expect(gen.next('NEW_ACCOUNT_STORE').value).toEqual(defaultDB);
    expect(gen.next(db).value).toEqual(call(getAccount, 'ID'));
    expect(gen.next(dbAccount).value).toEqual(call(mockCallback, true));
    expect(db.objects('Account')[0].accountStore).toEqual('NEW_ACCOUNT_STORE');

    last = gen.next();
    expect(last.value).toBeUndefined();
    expect(last.done).toBeTruthy();
  });
});

test('saveCreatingAccount', async () => {
  expect.assertions(13);

  const mockCallback = jest.fn();
  const mockAction = saveCreatingAccount(mockCallback);

  const gen = cloneableGenerator(saveCreatingAccountSaga)(mockAction);
  expect(gen.next().value).toEqual(select());

  // There is no account currently being created.
  const noAccountGen = gen.clone();
  expect(noAccountGen.next({
    accounts: {
      creatingAccount: null,
    },
  }).value).toEqual(call(mockCallback, false));
  let last = noAccountGen.next();
  expect(last.value).toBeUndefined();
  expect(last.done).toBeTruthy();

  // Current account is not completely filled.
  const accountIncompleteGen = gen.clone();
  expect(accountIncompleteGen.next({
    accounts: {
      creatingAccount: buildEmptyAccount(),
    },
  }).value).toEqual(call(mockCallback, false));
  last = accountIncompleteGen.next();
  expect(last.value).toBeUndefined();
  expect(last.done).toBeTruthy();

  // Successful path.
  const db = await buildRandomPathDatabase();
  expect(gen.next({
    accounts: {
      creatingAccount: accountMock,
    },
  }).value).toEqual(defaultDB);
  expect(gen.next(db).value).toEqual(call(mockCallback, true));
  expect(gen.next().value).toEqual(put(cancelAccountEditing()));
  last = gen.next();
  expect(last.value).toBeUndefined();
  expect(last.done).toBeTruthy();

  expect(convertFromDatabase(db.objects('Account')[0]))
    .toMatchObject({
      accountStore: 'ACCOUNT_STORE',
      name: 'NAME',
    });
});

test('saveMnemonicConfirmed', async () => {
  expect.assertions(9);

  const mockCallback = jest.fn();
  const mockAction = mnemonicConfirmed(mockCallback);

  const gen = cloneableGenerator(saveMnemonicConfirmed)(mockAction);
  expect(gen.next().value).toEqual(call(getCurrentAccount));

  // There is no account currently logged in.
  const noAccountGen = gen.clone();
  expect(noAccountGen.next(null).value).toEqual(call(mockCallback, false));
  let last = noAccountGen.next();
  expect(last.value).toBeUndefined();
  expect(last.done).toBeTruthy();

  // Successful path.
  const db = await buildRandomPathDatabase();
  let dbAccount = null;
  db.write(() => {
    dbAccount = db.create('Account', convertToDatabase(partialAccountMock, version));
  });

  expect(gen.next(dbAccount).value).toEqual(defaultDB);
  expect(gen.next(db).value).toEqual(call(mockCallback, true));
  last = gen.next();
  expect(last.value).toBeUndefined();
  expect(last.done).toBeTruthy();

  expect(convertFromDatabase(db.objects('Account')[0]))
    .toMatchObject({
      accountStore: 'ACCOUNT_STORE',
      name: 'NAME',
      confirmedMnemonic: true,
    });
});
