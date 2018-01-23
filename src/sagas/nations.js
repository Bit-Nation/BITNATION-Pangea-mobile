import { take, takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { CANCEL_NATION_CREATE, DONE_NATION_CREATE, START_NATIONS_FETCH, DONE_FETCH_NATIONS, NATION_CREATE } from '../actions/nations';
import { getPangeaLibrary } from '../services/container';

function* createNation(action) {
	console.log(action.navigator)
	if (action.payload) {
		try {
			let pangeaLib = yield call(getPangeaLibrary);
			let result = yield call(pangeaLib.eth.nation.create, action.payload);
  		yield put({ type: DONE_NATION_CREATE });
  		yield call([action.navigator, 'dismissModal']);
  		yield put({ type: START_NATIONS_FETCH });
  	} catch (e) {
  		console.log('Create profile error: ', e);
  	}
	}
}

function* fetchNations() {
  try {
		let pangeaLib = yield call(getPangeaLibrary);
		let result = yield call(pangeaLib.eth.nation.all);
	  yield put({ type: DONE_FETCH_NATIONS, payload: [...result] });
	} catch(e) {
		console.log('Update profile error: ', e);
	}
}

export default function* watchProfileUpdate() {
  yield takeEvery(NATION_CREATE, createNation);
  yield takeEvery(START_NATIONS_FETCH, fetchNations);
}
