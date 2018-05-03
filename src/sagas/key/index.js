import { takeEvery } from 'redux-saga/effects';
import { validateEnteredMnemonic } from './sagas';
import { VALIDATE_ENTERED_MNEMONIC } from '../../actions/key';

/**
 * @desc Root key saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield takeEvery(VALIDATE_ENTERED_MNEMONIC, validateEnteredMnemonic);
}
