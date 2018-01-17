import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import PangeaContainer from '../services/container';
import type {ProfileType} from 'BITNATION-Pangea-libs/src/database/schemata';

import { REQUEST_PROFILE_UPDATE, DONE_USER_EDITING, SET_USER_PROFILE, REQUEST_GET_PROFILE } from '../actions/profile';

function getPangeaLibrary() {
	return PangeaContainer;
}

function* updateProfile() {
	let pangeaLib = yield call(getPangeaLibrary);
	let user = yield select(state => state.profile);
	const profile:ProfileType = {
		...user.editingUser,
    id: 0,
    description: '',
    version: '0',
    image: user.editingUser.avatar ? user.editingUser.avatar : ''
  };
	let result = yield call(pangeaLib.profile.profile.setProfile, profile);
  yield put({ type: DONE_USER_EDITING });
}

function* getProfile() {
	let pangeaLib = yield call(getPangeaLibrary);
	console.log('pangea: ', pangeaLib);
	let profile = yield call(pangeaLib.profile.profile.getProfile);
	const user = {
		...profile,
    avatar: profile.image
  };
  yield put({ type: SET_USER_PROFILE, user: user });
}

export default function* watchProfileUpdate() {	
  yield takeEvery(REQUEST_PROFILE_UPDATE, updateProfile);
  yield takeEvery(REQUEST_GET_PROFILE, getProfile);
}
