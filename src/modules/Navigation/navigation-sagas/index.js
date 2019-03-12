import { takeEvery } from 'redux-saga/effects';
import { launchCorrectFlow } from './sagas';
import { CURRENT_ACCOUNT_ID_CHANGED } from '@pangea/accounts/accounts-actions';
import { START_NAVIGATION } from '../navigation-actions';

/**
 * @desc Root navigation saga. Handles showing of correct screens flow.
 * @return {void}
 */
export default function* rootSaga() {
  yield takeEvery([CURRENT_ACCOUNT_ID_CHANGED, START_NAVIGATION], launchCorrectFlow);
}
