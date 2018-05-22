// @flow

import { call, select, put } from 'redux-saga/effects';
import _ from 'lodash';

import AccountsService from '../../services/accounts';
import { changeMnemonicValid } from '../../actions/key';
import type { Mnemonic } from '../../types/Mnemonic';

/**
 * @desc Validate if entered mnemonic is a valid one.
 * @return {void}
 */
export function* validateEnteredMnemonic(): Generator<*, *, *> {
  let currentMnemonic: Mnemonic | null;
  try {
    currentMnemonic = yield call(AccountsService.getMnemonic);
  } catch (e) {
    currentMnemonic = null;
  }
  const { key: { enteredMnemonic } } = yield select();

  if (currentMnemonic === null) {
    const mnemonicCorrect = yield call(AccountsService.validateMnemonic, enteredMnemonic);
    yield put(changeMnemonicValid(mnemonicCorrect === true));
  } else {
    const mnemonicCorrect = _.isEqual(currentMnemonic, enteredMnemonic);
    yield put(changeMnemonicValid(mnemonicCorrect === true));
  }
}
