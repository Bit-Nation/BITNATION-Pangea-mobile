// @flow

import { takeEvery, all, call } from 'redux-saga/effects';

import rootSaga from '../../../../src/sagas/accounts';
import {
  checkPasswordSaga,
  checkPinCodeSaga,
  listenForDatabaseUpdates,
  loginActionHandler,
  logout,
  saveEditingAccount,
  saveCreatingAccount,
  savePasswordSaga,
  savePinCodeSaga,
  startAccountCreation,
  startRestoreAccountUsingMnemonic,
} from '../../../../src/sagas/accounts/sagas';
import {
  CHECK_PASSWORD,
  CHECK_PIN_CODE,
  LOGIN,
  LOGOUT,
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
    takeEvery(LOGOUT, logout),
    takeEvery(SAVE_EDITING_ACCOUNT, saveEditingAccount),
    takeEvery(CHECK_PIN_CODE, checkPinCodeSaga),
    takeEvery(CHECK_PASSWORD, checkPasswordSaga),
    takeEvery(SAVE_PIN_CODE, savePinCodeSaga),
    takeEvery(SAVE_PASSWORD, savePasswordSaga),
    takeEvery(SAVE_CREATING_ACCOUNT, saveCreatingAccount),
  ]));
});
