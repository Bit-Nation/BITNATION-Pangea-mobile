import { call, put, select, takeEvery, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import {
  START_NATIONS_FETCH, DONE_FETCH_NATIONS,
  CANCEL_LOADING, REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION,
} from '../actions/nations';
import { getPangeaLibrary } from '../services/container';
import { waitConnect } from '../utils/connectivity';
import { CONNECTION_TIMEOUT } from '../global/Constants';
import { openedNation } from '../reducers/nations';
import { convertFromDatabase } from '../utils/nations';

export async function checkConnection() {
  return await waitConnect(CONNECTION_TIMEOUT);
}

const extractMessage = (error) => {
  if (error.toString().indexOf('insufficient') !== -1) {
    return 'Insufficient funds. Please check your wallet';
  }
  return error.toString();
};

export const getNations = state => state.nations;

export function* fetchNations() {
  try {
    console.log('fetching nations');
    const pangeaLib = yield call(getPangeaLibrary);
    const nationsCache = yield call(pangeaLib.eth.nation.all);
    const mappedCache = nationsCache.map(convertFromDatabase);
    yield put({ type: DONE_FETCH_NATIONS, payload: [...mappedCache] });

    yield call(checkConnection);
    console.log('start syncing with blockchain');
    yield call(pangeaLib.eth.nation.index);
    console.log('synced with blockchain');

    const updatedNations = yield call(pangeaLib.eth.nation.all);
    const mappedNations = updatedNations.map(convertFromDatabase);
    yield put({ type: DONE_FETCH_NATIONS, payload: [...mappedNations] });
  } catch (e) {
    console.log('Update nation error: ', e);
    Alert.alert(extractMessage(e));
    yield put({ type: CANCEL_LOADING });
  }
}

export function* joinNation() {
  try {
    const pangeaLib = yield call(getPangeaLibrary);
    const nationsState = yield select(getNations);
    const currentNation = openedNation(nationsState);
    yield call(checkConnection);
    yield call(pangeaLib.eth.nation.joinNation, currentNation);
    // console.log('joined nation: ', result);
    yield put({ type: CANCEL_LOADING });
    yield put({ type: START_NATIONS_FETCH });
  } catch (e) {
    console.log('Join nation error: ', e);
    Alert.alert(extractMessage(e));
    yield put({ type: CANCEL_LOADING });
  }
}

export function* leaveNation() {
  try {
    const pangeaLib = yield call(getPangeaLibrary);
    const nationsState = yield select(getNations);
    const currentNation = openedNation(nationsState);
    yield call(checkConnection);
    yield call(pangeaLib.eth.nation.leaveNation, currentNation);
    // console.log('leave nation: ', result);
    yield put({ type: CANCEL_LOADING });
    yield put({ type: START_NATIONS_FETCH });
  } catch (e) {
    console.log('Leave nation error: ', e);
    Alert.alert(extractMessage(e));
    yield put({ type: CANCEL_LOADING });
  }
}

export default function* watchNationUpdate() {
  yield all([
    yield takeEvery(START_NATIONS_FETCH, fetchNations),
    yield takeEvery(REQUEST_JOIN_NATION, joinNation),
    yield takeEvery(REQUEST_LEAVE_NATION, leaveNation),
  ]);
}
