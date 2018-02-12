import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Alert } from 'react-native';

import {
  START_NATIONS_FETCH, DONE_FETCH_NATIONS,
  CANCEL_LOADING, REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION,
} from '../actions/nations';
import { getPangeaLibrary } from '../services/container';
import { waitConnect } from '../utils/connectivity';
import { CONNECTION_TIMEOUT } from '../global/Constants';
import { openedNation } from '../reducers/nations';

export async function checkConnection() {
  return await waitConnect(CONNECTION_TIMEOUT);
}

const extractMessage = (error) => {
  if (error.toString().indexOf('insufficient') !== -1) {
    return 'Insufficient funds. Please check your wallet';
  }
  return error.toString();
};

function* fetchNations() {
  try {
    console.log('fetching nations');
    let pangeaLib = yield call(getPangeaLibrary);
    const nationsCache = yield call(pangeaLib.eth.nation.all);
    yield put({ type: DONE_FETCH_NATIONS, payload: [...nationsCache] });

    yield call(checkConnection);
    console.log('start syncing with blockchain');
    yield call(pangeaLib.eth.nation.index);
    console.log('synced with blockchain');

    const updatedNations = yield call(pangeaLib.eth.nation.all);
    yield put({ type: DONE_FETCH_NATIONS, payload: [...updatedNations] });
  } catch (e) {
    console.log('Update nation error: ', e);
    Alert.alert(extractMessage(e));
    yield put({ type: CANCEL_LOADING });
  }
}

function* joinNation() {
  try {
    let pangeaLib = yield call(getPangeaLibrary);
    let nationsState = yield select(state => state.nations);
    const currentNation = openedNation(nationsState);
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

function* leaveNation() {
  try {
    let pangeaLib = yield call(getPangeaLibrary);
    let nationsState = yield select(state => state.nations);
    const currentNation = openedNation(nationsState);
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

export default function* watchNatUpdate() {
  yield takeEvery(START_NATIONS_FETCH, fetchNations);
  yield takeEvery(REQUEST_JOIN_NATION, joinNation);
  yield takeEvery(REQUEST_LEAVE_NATION, leaveNation);
}
