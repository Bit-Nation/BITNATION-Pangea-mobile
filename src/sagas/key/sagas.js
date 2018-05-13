// @flow

/* eslint-disable no-use-before-define */
import { call, select, put } from 'redux-saga/effects';
import AccountsService from '../../services/accounts';
import { changeMnemonicValid } from '../../actions/key';

/**
 * @desc Validate if entered mnemonic is a valid one.
 * @return {void}
 */
export function* validateEnteredMnemonic(): Generator<*, *, *> {
  const { key: { enteredMnemonic } } = yield select();
  const mnemonicCorrect = yield call(AccountsService.validateMnemonic, enteredMnemonic);
  yield put(changeMnemonicValid(mnemonicCorrect === true));
}
