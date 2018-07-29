import { takeEvery } from 'redux-saga/effects';
import { startMigration, isMigration } from './sagas';
import { START_MIGRATION, IS_MIGRATION } from '../../actions/migration';

/**
 * @desc Root key saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield takeEvery(START_MIGRATION, startMigration);
  yield takeEvery(IS_MIGRATION, isMigration);
}
