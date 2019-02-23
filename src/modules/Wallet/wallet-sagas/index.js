// @flow

import {
  all,
  takeEvery,
} from 'redux-saga/effects';
import {
  SEND_MONEY,
  UPDATE_WALLET_BALANCE,
  UPDATE_WALLET_LIST,
} from '../../actions/wallet';
import {
  updateWalletList,
  updateWalletBalance,
  sendMoneySaga,
} from './sagas';
import { SERVICES_CREATED, SERVICES_DESTROYED } from '../../actions/serviceContainer';

/**
 * @desc Root wallet saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    takeEvery([UPDATE_WALLET_LIST, SERVICES_CREATED, SERVICES_DESTROYED], updateWalletList),
    takeEvery(UPDATE_WALLET_BALANCE, updateWalletBalance),
    takeEvery(SEND_MONEY, sendMoneySaga),
  ]);
}
