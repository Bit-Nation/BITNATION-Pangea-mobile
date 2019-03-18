// @flow

import { takeEvery, all } from 'redux-saga/effects';
import rootSaga from '../../wallet-sagas';
import { SEND_MONEY, UPDATE_WALLET_BALANCE, UPDATE_WALLET_LIST } from '../../wallet-actions';
import { sendMoneySaga, updateWalletBalance, updateWalletList } from '../../wallet-sagas/sagas';
import { SERVICES_CREATED, SERVICES_DESTROYED } from 'pangea-common/serviceContainer-actions';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    takeEvery([UPDATE_WALLET_LIST, SERVICES_CREATED, SERVICES_DESTROYED], updateWalletList),
    takeEvery(UPDATE_WALLET_BALANCE, updateWalletBalance),
    takeEvery(SEND_MONEY, sendMoneySaga),
  ]));
});
