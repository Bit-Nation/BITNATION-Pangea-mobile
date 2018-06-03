// @flow

import { takeEvery, all } from 'redux-saga/effects';
import rootSaga from '../../../../src/sagas/wallet';
import { SEND_MONEY, UPDATE_WALLET_BALANCE, UPDATE_WALLET_LIST } from '../../../../src/actions/wallet';
import { sendMoneySaga, updateWalletBalance, updateWalletList } from '../../../../src/sagas/wallet/sagas';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    takeEvery(UPDATE_WALLET_LIST, updateWalletList),
    takeEvery(UPDATE_WALLET_BALANCE, updateWalletBalance),
    takeEvery(SEND_MONEY, sendMoneySaga),
  ]));
});
