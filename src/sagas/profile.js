import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { getPangeaLibrary } from '../services/container';
import type {ProfileType} from 'BITNATION-Pangea-libs/src/database/schemata';

import { REQUEST_PROFILE_UPDATE, DONE_USER_EDITING, SET_USER_PROFILE, REQUEST_GET_PROFILE } from '../actions/profile';

function* updateProfile() {
	try {
		let pangeaLib = yield call(getPangeaLibrary);
		let user = yield select(state => state.profile);
		const profile:ProfileType = {
		    id: 0,
		    name: user.editingUser.name ? user.editingUser.name : '',
		    location: user.editingUser.location ? user.editingUser.location : '',
		    latitude: user.editingUser.latitude ? user.editingUser.latitude : '',
		    longitude: user.editingUser.longitude ? user.editingUser.longitude : '',
		    description: '',
		    version: '0',
		    image: user.editingUser.avatar ? user.editingUser.avatar : ''
		};
		let result = yield call(pangeaLib.profile.profile.setProfile, profile);
	  	yield put({ type: DONE_USER_EDITING });
	} catch(e) {
		console.log('Update profile error: ', e);
	}
}

function* getProfile() {
	try {
		let pangeaLib = yield call(getPangeaLibrary);	
		let profile = yield call(pangeaLib.profile.profile.getProfile);
		if (profile) {
			const user = {
				...profile,
			    avatar: profile.image
			};
		  	yield put({ type: SET_USER_PROFILE, user: user });
		}
	} catch (e) {
		console.log('Get profile error: ', e);
	}
}

export default function* watchProfileUpdate() {	
  	yield takeEvery(REQUEST_PROFILE_UPDATE, updateProfile);
  	yield takeEvery(REQUEST_GET_PROFILE, getProfile);
}
