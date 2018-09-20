import { all, call, takeEvery } from 'redux-saga/effects';
import {
  listenForDatabaseUpdates,
  loginActionHandler,
  validateMnemonicWithAccountActionHandler,
  logout,
  cancelLogin,
  checkPasswordSaga,
  checkPinCodeSaga,
  saveEditingAccount,
  savePasswordSaga,
  savePinCodeSaga,
  saveCreatingAccount,
  startAccountCreation,
  startRestoreAccountUsingMnemonic, saveMnemonicConfirmed, updateSignedProfile,
} from './sagas';
import {
  LOGIN,
  VALIDATE_MNEMONIC_WITH_ACCOUNT,
  LOGOUT,
  CANCEL_LOGIN,
  CHECK_PASSWORD,
  CHECK_PIN_CODE,
  SAVE_PASSWORD,
  SAVE_PIN_CODE,
  SAVE_CREATING_ACCOUNT,
  START_ACCOUNT_CREATION,
  START_RESTORE_ACCOUNT_USING_MNEMONIC, MNEMONIC_CONFIRMED, ACCOUNTS_LIST_UPDATED,
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
  ]);
}
