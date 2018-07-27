import { takeEvery } from 'redux-saga/effects';
import { startMigration } from './sagas';
import { START_MIGRATION } from '../../actions/migration';

/**
 * @desc Root key saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield takeEvery(START_MIGRATION, startMigration);
}
