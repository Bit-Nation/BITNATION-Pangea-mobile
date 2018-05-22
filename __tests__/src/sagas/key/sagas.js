// @flow

import { select, call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import { validateEnteredMnemonic } from '../../../../src/sagas/key/sagas';
import AccountsService from '../../../../src/services/accounts';
import { changeMnemonicValid } from '../../../../src/actions/key';

describe('validateEnteredMnemonic', () => {
  test('not logged in', () => {
    const gen = cloneableGenerator(validateEnteredMnemonic)();
    expect(gen.next().value).toEqual(call(AccountsService.getMnemonic));
    expect(gen.next(null).value).toEqual(select());
    const enteredMnemonic = ['a'];
    expect(gen.next({ key: { enteredMnemonic } }).value)
      .toEqual(call(AccountsService.validateMnemonic, enteredMnemonic));

    const successGen = gen.clone();
    expect(successGen.next(true).value).toEqual(put(changeMnemonicValid(true)));

    const failureGen = gen.clone();
    expect(failureGen.next(false).value).toEqual(put(changeMnemonicValid(false)));
  });

  test('logged in', () => {
    const gen = cloneableGenerator(validateEnteredMnemonic)();
    expect(gen.next().value).toEqual(call(AccountsService.getMnemonic));
    expect(gen.next(['a']).value).toEqual(select());

    const successGen = gen.clone();
    expect(successGen.next({ key: { enteredMnemonic: ['a'] } }).value).toEqual(put(changeMnemonicValid(true)));

    const failureGen = gen.clone();
    expect(failureGen.next({ key: { enteredMnemonic: ['b'] } }).value).toEqual(put(changeMnemonicValid(false)));
  });
});
