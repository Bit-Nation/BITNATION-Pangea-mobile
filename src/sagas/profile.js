import { call, put, select, takeEvery } from 'redux-saga/effects';
import type { ProfileType } from 'BITNATION-Pangea-libs/src/database/schemata';
import { getPangeaLibrary } from '../services/container';
import { REQUEST_PROFILE_UPDATE, DONE_USER_EDITING, SET_USER_PROFILE, REQUEST_GET_PROFILE, CANCEL_USER_EDITING } from '../actions/profile';

export const getProfileState = state => state.profile
export function* updateProfile() {
  try {
    let pangeaLib = yield call(getPangeaLibrary);
    let user = yield select(getProfileState);
    const profile: ProfileType = {
      id: 0,
      name: user.editingUser.name ? user.editingUser.name.trim() : '',
      location: user.editingUser.location ? user.editingUser.location.trim() : '',
      latitude: user.editingUser.latitude ? user.editingUser.latitude : '',
      longitude: user.editingUser.longitude ? user.editingUser.longitude : '',
      description: '',
      version: '0',
      image: user.editingUser.avatar ? user.editingUser.avatar : '',
    };
    let result = yield call(pangeaLib.profile.profile.setProfile, profile);
    yield put({ type: DONE_USER_EDITING });
  } catch (e) {
    yield put({ type: CANCEL_USER_EDITING });
    console.log('Update profile error: ', e);
  }
}

export function* getProfile() {
  try {
    let pangeaLib = yield call(getPangeaLibrary);
    let profile = yield call(pangeaLib.profile.profile.getProfile);
    const user = {
      ...profile,
      avatar: profile.image,
    };
    yield put({ type: SET_USER_PROFILE, user: user });
  } catch (e) {
    yield put({ type: SET_USER_PROFILE, user: null });
    console.log('Get profile error: ', e);
  }
}

export default function* watchProfileUpdate() {
  yield takeEvery(REQUEST_PROFILE_UPDATE, updateProfile);
  yield takeEvery(REQUEST_GET_PROFILE, getProfile);
}
