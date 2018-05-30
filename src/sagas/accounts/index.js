import { all, call, takeEvery } from 'redux-saga/effects';
import {
  listenForDatabaseUpdates,
  loginActionHandler,
  logout,
  checkPasswordSaga,
  checkPinCodeSaga,
  saveEditingAccount,
  savePasswordSaga,
  savePinCodeSaga,
  saveCreatingAccount,
  startAccountCreation,
  startRestoreAccountUsingMnemonic, saveMnemonicConfirmed,
} from './sagas';
import {
  LOGIN,
  LOGOUT,
  CHECK_PASSWORD,
  CHECK_PIN_CODE,
  SAVE_PASSWORD,
  SAVE_PIN_CODE,
  SAVE_CREATING_ACCOUNT,
  START_ACCOUNT_CREATION,
  START_RESTORE_ACCOUNT_USING_MNEMONIC, MNEMONIC_CONFIRMED,
} from '../../actions/accounts';
import { SAVE_EDITING_ACCOUNT } from '../../actions/profile';

/**
 * @desc Root accounts saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
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
    takeEvery(MNEMONIC_CONFIRMED, saveMnemonicConfirmed),
  ]);
}
