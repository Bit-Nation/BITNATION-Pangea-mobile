// @flow

import { put, call, select } from 'redux-saga/effects';
import ServiceContainer from 'pangea-common/service-container';
import { getCurrentAccount } from '@pangea/accounts/accounts-reducers';
import AccountsService from '@pangea/accounts/accounts-services';
import { servicesCreated, servicesDestroyed } from 'pangea-common/serviceContainer-actions';

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
    yield put(servicesDestroyed());
  } else {
    const ethPrivateKey = yield call(AccountsService.getEthPrivateKey);
    yield call([ServiceContainer.instance, 'initServices'], currentAccount, ethPrivateKey);
    yield put(servicesCreated());
  }
}
