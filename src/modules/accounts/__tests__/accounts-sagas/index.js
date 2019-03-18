// @flow

import { takeEvery, all, call } from 'redux-saga/effects';

import rootSaga from '../../accounts-sagas';
import {
  checkPasswordSaga,
  checkPinCodeSaga,
  listenForDatabaseUpdates,
  loginActionHandler,
  validateMnemonicWithAccountActionHandler,
  logout,
  cancelLogin,
  saveEditingAccount,
  saveCreatingAccount,
  savePasswordSaga,
  savePinCodeSaga,
  startAccountCreation,
  startRestoreAccountUsingMnemonic, saveMnemonicConfirmed, updateSignedProfile,
} from '../../accounts-sagas/sagas';
import {
  ACCOUNTS_LIST_UPDATED,
  CHECK_PASSWORD,
  CHECK_PIN_CODE,
  LOGIN,
  VALIDATE_MNEMONIC_WITH_ACCOUNT,
  LOGOUT, CANCEL_LOGIN,
  MNEMONIC_CONFIRMED,
  SAVE_CREATING_ACCOUNT,
  SAVE_PASSWORD,
  SAVE_PIN_CODE,
  START_ACCOUNT_CREATION,
  START_RESTORE_ACCOUNT_USING_MNEMONIC,
} from '../../accounts-actions';
import { SAVE_EDITING_ACCOUNT } from '@pangea/profile/profile-actions';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    call(listenForDatabaseUpdates),
    takeEvery(START_ACCOUNT_CREATION, startAccountCreation),
    takeEvery(START_RESTORE_ACCOUNT_USING_MNEMONIC, startRestoreAccountUsingMnemonic),
    takeEvery(LOGIN, loginActionHandler),
    takeEvery(VALIDATE_MNEMONIC_WITH_ACCOUNT, validateMnemonicWithAccountActionHandler),
    takeEvery(LOGOUT, logout),
    takeEvery(CANCEL_LOGIN, cancelLogin),
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
