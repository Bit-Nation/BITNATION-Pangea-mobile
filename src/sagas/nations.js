import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Alert } from 'react-native';

import {
  CANCEL_NATION_CREATE, DONE_NATION_CREATE, START_NATIONS_FETCH, DONE_FETCH_NATIONS,
  NATION_CREATE, CANCEL_LOADING, REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION,
} from '../actions/nations';
import { getPangeaLibrary } from '../services/container';
import { waitConnect } from '../utils/connectivity';
import { CONNECTION_TIMEOUT } from '../global/Constants';
import { resolveNation } from '../utils/nations';

export async function checkConnection() {
  return await waitConnect(CONNECTION_TIMEOUT);
}

const extractMessage = (error) => {
  if (error.toString().indexOf('insufficient') !== -1) {
    return 'Insufficient funds. Please check your wallet';
  }
  return error.toString();
};

export function* createNation(action) {
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
      Alert.alert(extractMessage(e));
      yield put({ type: CANCEL_LOADING });
    }
  }
}

export function* fetchNations() {
  try {
    let pangeaLib = yield call(getPangeaLibrary);
    yield call(checkConnection);
    yield call(pangeaLib.eth.nation.index);
    const updatedNations = yield call(pangeaLib.eth.nation.all);
    yield put({ type: DONE_FETCH_NATIONS, payload: [...updatedNations] });
  } catch (e) {
    console.log('Update nation error: ', e);
    Alert.alert(extractMessage(e));
    yield put({ type: CANCEL_LOADING });
  }
}

export const getNations = state => state.nations

export function* joinNation() {
  try {
    let pangeaLib = yield call(getPangeaLibrary);
    let nationsState = yield select(getNations);
    const currentNation = resolveNation(nationsState.nations, nationsState.openedNationId);
    yield call(checkConnection);
    let result = yield call(pangeaLib.eth.nation.joinNation, currentNation.id);
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
    let pangeaLib = yield call(getPangeaLibrary);
    let nationsState = yield select(getNations);
    const currentNation = resolveNation(nationsState.nations, nationsState.openedNationId);
    yield call(checkConnection);
    let result = yield call(pangeaLib.eth.nation.leaveNation, currentNation.id);
    // console.log('leave nation: ', result);
    yield put({ type: CANCEL_LOADING });
    yield put({ type: START_NATIONS_FETCH });
  } catch (e) {
    console.log('Leave nation error: ', e);
    Alert.alert(extractMessage(e));
    yield put({ type: CANCEL_LOADING });
  }
}

export default function* watchProfileUpdate() {
  yield takeEvery(NATION_CREATE, createNation);
  yield takeEvery(START_NATIONS_FETCH, fetchNations);
  yield takeEvery(REQUEST_JOIN_NATION, joinNation);
  yield takeEvery(REQUEST_LEAVE_NATION, leaveNation);
}
