// @flow

import { call, select } from 'redux-saga/effects';
import ServiceContainer from '../../services/container';
import { getCurrentAccount } from '../../reducers/accounts';
import AccountsService from '../../services/accounts';

/**
 * @desc Generator to be called when current account is changed.
 * Used to create and destroy services based on current account.
 * @return {void}
 */
export function* onCurrentAccountChange(): Generator<*, *, *> {
  const { accounts } = yield select();
  const currentAccount = getCurrentAccount(accounts);
  if (currentAccount == null) {
    yield call([ServiceContainer.instance, 'destroyServices']);
  } else {
    const ethPrivateKey = yield call(AccountsService.getEthPrivateKey);
    yield call([ServiceContainer.instance, 'initServices'], currentAccount, ethPrivateKey);
  }
}
