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

/**
 * @desc Wait until the connection is established
  * @return {void}
 */
export async function checkConnection() {
  await waitConnect(CONNECTION_TIMEOUT);
}

const extractMessage = (error) => {
  if (error.toString().indexOf('insufficient') !== -1) {
    return 'Insufficient funds. Please check your wallet';
  }
  return error.toString();
};

export const getNations = state => state.nations;

/**
 * @desc function generator for nations fetch saga
  * @return {void}
 */
export function* fetchNations() {
  try {
    const pangeaLib = yield call(getPangeaLibrary);
    const nationsCache = yield call(pangeaLib.eth.nation.all);
    const mappedCache = nationsCache.map(convertFromDatabase);
    yield put({ type: DONE_FETCH_NATIONS, payload: [...mappedCache] });

    yield call(checkConnection);
    yield call(pangeaLib.eth.nation.index);

    const updatedNations = yield call(pangeaLib.eth.nation.all);
    const mappedNations = updatedNations.map(convertFromDatabase);
    yield put({ type: DONE_FETCH_NATIONS, payload: [...mappedNations] });
  } catch (e) {
    Alert.alert(extractMessage(e));
    yield put({ type: CANCEL_LOADING });
  }
}


/**
 * @desc function generator for nations join saga
  * @return {void}
 */
export function* joinNation() {
  try {
    const pangeaLib = yield call(getPangeaLibrary);
    const nationsState = yield select(getNations);
    const currentNation = openedNation(nationsState);
    yield call(checkConnection);
    yield call(pangeaLib.eth.nation.joinNation, currentNation.id);
    yield put({ type: CANCEL_LOADING });
    yield put({ type: START_NATIONS_FETCH });
  } catch (e) {
    Alert.alert(extractMessage(e));
    yield put({ type: CANCEL_LOADING });
  }
}

/**
 * @desc function generator for nations leave saga
  * @return {void}
 */
export function* leaveNation() {
  try {
    const pangeaLib = yield call(getPangeaLibrary);
    const nationsState = yield select(getNations);
    const currentNation = openedNation(nationsState);
    yield call(checkConnection);
    yield call(pangeaLib.eth.nation.leaveNation, currentNation.id);
    yield put({ type: CANCEL_LOADING });
    yield put({ type: START_NATIONS_FETCH });
  } catch (e) {
    Alert.alert(extractMessage(e));
    yield put({ type: CANCEL_LOADING });
  }
}

/**
 * @desc action watchers for nations saga
  * @return {void}
 */
export default function* watchNationUpdate() {
  yield all([
    yield takeEvery(START_NATIONS_FETCH, fetchNations),
    yield takeEvery(REQUEST_JOIN_NATION, joinNation),
    yield takeEvery(REQUEST_LEAVE_NATION, leaveNation),
  ]);
}
