import { take, takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { CANCEL_NATION_CREATE, DONE_NATION_CREATE, START_NATIONS_FETCH, DONE_FETCH_NATIONS } from '../actions/nations';
import { getPangeaLibrary } from '../services/container';

function* doneNationCreation(action) {
	if (action.payload) {
		console.log('nation: ', action.payload);
		try {
			let pangeaLib = yield call(getPangeaLibrary);
			let result = yield call(pangeaLib.eth.nation.create, action.payload);
			console.log('nation create result: ', result);
  		yield put({ type: DONE_NATION_CREATE });
  	} catch (e) {
  		console.log('Create profile error: ', e);
  	}
	}
}

function* fetchNations() {
  try {
		let pangeaLib = yield call(getPangeaLibrary);
		let result = yield call(pangeaLib.eth.nation.all);
		console.log('nations: ', result);
	  	yield put({ type: DONE_FETCH_NATIONS, payload: [] });
	} catch(e) {
		console.log('Update profile error: ', e);
	}
}

export default function* watchProfileUpdate() {
  yield takeEvery(DONE_NATION_CREATE, doneNationCreation);
  yield takeEvery(START_NATIONS_FETCH, fetchNations);
}
