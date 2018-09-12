// @flow

import { takeEvery, all, call } from 'redux-saga/effects';

import rootSaga from '../../../../src/sagas/accounts';
import {
  checkPasswordSaga,
  checkPinCodeSaga,
  listenForDatabaseUpdates,
  loginActionHandler,
  validateMnemonicWithAccountActionHandler,
  restartPanthalassaWithAccountHandler,
  checkMnemonicWithAccountListActionHandler,
  migrateDuplicateAccountsHandle,
  logout,
  saveEditingAccount,
  saveCreatingAccount,
  savePasswordSaga,
  savePinCodeSaga,
  startAccountCreation,
  startRestoreAccountUsingMnemonic, saveMnemonicConfirmed, updateSignedProfile,
} from '../../../../src/sagas/accounts/sagas';
import {
  ACCOUNTS_LIST_UPDATED,
  CHECK_PASSWORD,
  CHECK_PIN_CODE,
  LOGIN,
  VALIDATE_MNEMONIC_WITH_ACCOUNT,
  RESTART_PANTHALASSA_WITH_ACCOUNT,
  CHECK_MNEMONIC_WITH_ACCOUNT_LIST,
  MIGRATE_DUPLICATE_ACCOUNTS,
  LOGOUT, MNEMONIC_CONFIRMED,
  SAVE_CREATING_ACCOUNT,
  SAVE_PASSWORD,
  SAVE_PIN_CODE,
  START_ACCOUNT_CREATION,
  START_RESTORE_ACCOUNT_USING_MNEMONIC,
} from '../../../../src/actions/accounts';
import { SAVE_EDITING_ACCOUNT } from '../../../../src/actions/profile';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    call(listenForDatabaseUpdates),
    takeEvery(START_ACCOUNT_CREATION, startAccountCreation),
    takeEvery(START_RESTORE_ACCOUNT_USING_MNEMONIC, startRestoreAccountUsingMnemonic),
    takeEvery(LOGIN, loginActionHandler),
    takeEvery(VALIDATE_MNEMONIC_WITH_ACCOUNT, validateMnemonicWithAccountActionHandler),
    takeEvery(CHECK_MNEMONIC_WITH_ACCOUNT_LIST, checkMnemonicWithAccountListActionHandler),
    takeEvery(RESTART_PANTHALASSA_WITH_ACCOUNT, restartPanthalassaWithAccountHandler),
    takeEvery(MIGRATE_DUPLICATE_ACCOUNTS, migrateDuplicateAccountsHandle),
    takeEvery(LOGOUT, logout),
    takeEvery(SAVE_EDITING_ACCOUNT, saveEditingAccount),
    takeEvery(ACCOUNTS_LIST_UPDATED, updateSignedProfile),
    takeEvery(CHECK_PIN_CODE, checkPinCodeSaga),
    takeEvery(CHECK_PASSWORD, checkPasswordSaga),
    takeEvery(SAVE_PIN_CODE, savePinCodeSaga),
    takeEvery(SAVE_PASSWORD, savePasswordSaga),
    takeEvery(SAVE_CREATING_ACCOUNT, saveCreatingAccount),
    takeEvery(MNEMONIC_CONFIRMED, saveMnemonicConfirmed),
  ]));
});
