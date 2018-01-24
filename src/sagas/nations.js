import { take, takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { CANCEL_NATION_CREATE, DONE_NATION_CREATE, START_NATIONS_FETCH, DONE_FETCH_NATIONS, NATION_CREATE, CANCEL_LOADING } from '../actions/nations';
import { getPangeaLibrary } from '../services/container';
import { waitConnect } from '../utils/connectivity';
import { CONNECTION_TIMEOUT } from '../global/Constants';

export async function checkConnection() {
  return await waitConnect(CONNECTION_TIMEOUT);
}

function* createNation(action) {
	if (action.payload) {
		try {
			let pangeaLib = yield call(getPangeaLibrary);
		  yield call(checkConnection);
  		let result = yield call(pangeaLib.eth.nation.create, action.payload);
  		yield put({ type: DONE_NATION_CREATE });
  		yield call([action.navigator, 'dismissModal']);
  		yield put({ type: START_NATIONS_FETCH });
  	} catch (e) {
  		console.log('Create nation error: ', e);
  		yield put({ type: CANCEL_LOADING });
  	}
	}
}

function* fetchNations() {
  try {
		let pangeaLib = yield call(getPangeaLibrary);
		yield call(checkConnection);
		let result = yield call(pangeaLib.eth.nation.all);
	  yield put({ type: DONE_FETCH_NATIONS, payload: [...result] });
	} catch(e) {
		console.log('Update nation error: ', e);
		yield put({ type: CANCEL_LOADING });
	}
}

export default function* watchProfileUpdate() {
  yield takeEvery(NATION_CREATE, createNation);
  yield takeEvery(START_NATIONS_FETCH, fetchNations);
}
