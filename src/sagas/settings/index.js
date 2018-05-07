import { all, call, takeEvery } from 'redux-saga/effects';
import { loadSettings, saveSettings, startDatabaseListening } from './sagas';
import { LOAD_SETTINGS, SAVE_SETTINGS } from '../../actions/settings';

/**
 * @desc Root settings saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(startDatabaseListening),
    yield takeEvery(LOAD_SETTINGS, loadSettings),
    yield takeEvery(SAVE_SETTINGS, saveSettings),
  ]);
}
