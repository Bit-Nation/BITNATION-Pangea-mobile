import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { getPangeaLibrary } from '../services/container';
import { CANCEL_NATION_CREATE, DONE_NATION_CREATE, START_NATIONS_FETCH, DONE_FETCH_NATIONS } from '../actions/nations';
import { getPangeaLibrary } from '../services/container';


function* doneNationCreation() {
  yield put({ type: DONE_NATION_CREATE });
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