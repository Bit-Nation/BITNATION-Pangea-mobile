import { all, call, takeEvery } from 'redux-saga/effects';

import { SAVE_PROFILE, SAVE_PRE_KEY_BUNDLE } from '../../actions/chat';
import {
  saveProfile,
  savePreKeyBundle,
} from './sagas';

/**
 * @desc Root activity saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    takeEvery(SAVE_PROFILE, saveProfile),
    takeEvery(SAVE_PRE_KEY_BUNDLE, savePreKeyBundle),
  ]);
}
