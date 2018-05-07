/* eslint-disable */

import { call, put, select } from 'redux-saga/effects';

import { sendMoneyFailed, sendMoneySuccess } from '../../actions/wallet';
import EthereumService from '../../services/ethereum';

export function* sendMoneySaga(action) {
  const state = yield select();
  const fromAddress = state.wallet.selectedWalletAddress;
  const toAddress = action.toEthAddress;
  const amount = action.amount;

  try {
    yield call(EthereumService.sendMoney, fromAddress, toAddress, amount);
    yield put(sendMoneySuccess());
  } catch (error) {
    console.log(error);
    yield put(sendMoneyFailed(error));
  }
}


