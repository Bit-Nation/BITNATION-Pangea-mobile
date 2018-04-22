import { all, takeEvery } from 'redux-saga/effects';
import { launchCorrectFlow } from './sagas';
import { CURRENT_ACCOUNT_ID_CHANGED } from '../../actions/accounts';
import { START_NAVIGATION } from '../../actions/navigation';

/**
 * @desc Root navigation saga. Handles showing of correct screens flow.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    takeEvery([CURRENT_ACCOUNT_ID_CHANGED, START_NAVIGATION], launchCorrectFlow),
  ]);
}
