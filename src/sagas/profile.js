import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'

import { REQUEST_PROFILE_UPDATE, DONE_USER_EDITING } from '../actions/profile';

function* updateProfile() {
  yield put({ type: DONE_USER_EDITING });
}

export default function* watchProfileUpdate() {	
  yield takeEvery(REQUEST_PROFILE_UPDATE, updateProfile);
}
