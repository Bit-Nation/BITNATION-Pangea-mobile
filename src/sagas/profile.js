import { call, put, select, takeEvery } from 'redux-saga/effects';
import type { ProfileType } from 'BITNATION-Pangea-libs/src/database/schemata';
import { getPangeaLibrary } from '../services/container';
import { REQUEST_PROFILE_UPDATE, DONE_USER_EDITING, SET_USER_PROFILE, REQUEST_GET_PROFILE, CANCEL_USER_EDITING } from '../actions/profile';

export const getProfileState = state => state.profile;
/**
 * @desc function generator for profile update saga
  * @return {void}
 */
export function* updateProfile() {
  try {
    const pangeaLib = yield call(getPangeaLibrary);
    const user = yield select(getProfileState);
    const profile: ProfileType = {
      id: 0,
      name: user.editingUser.name ? user.editingUser.name.trim() : '',
      location: user.editingUser.location ? user.editingUser.location.trim() : '',
      // @todo Remove latitude once it becomes not a required field in Pangea libs.
      latitude: '',
      longitude: '',
      description: '',
      version: '0',
      image: user.editingUser.avatar ? user.editingUser.avatar : '',
    };
    yield call(pangeaLib.profile.profile.setProfile, profile);
    yield put({ type: DONE_USER_EDITING });
  } catch (e) {
    yield put({ type: CANCEL_USER_EDITING });
  }
}

/**
 * @desc function generator for get profile saga
  * @return {void}
 */
export function* getProfile() {
  try {
    const pangeaLib = yield call(getPangeaLibrary);
    const profile = yield call(pangeaLib.profile.profile.getProfile);
    const user = {
      ...profile,
      avatar: profile.image,
    };
    yield put({ type: SET_USER_PROFILE, user });
  } catch (e) {
    yield put({ type: SET_USER_PROFILE, user: null });
  }
}

/**
 * @desc action watchers for profile saga
  * @return {void}
 */
export default function* watchProfileUpdate() {
  yield takeEvery(REQUEST_PROFILE_UPDATE, updateProfile);
  yield takeEvery(REQUEST_GET_PROFILE, getProfile);
}
