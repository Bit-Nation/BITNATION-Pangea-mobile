import { call, put, select, takeEvery, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import {
  START_NATIONS_FETCH, CANCEL_LOADING, REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION,
  doneSyncNations, doneFetchNations,
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

/**
 * @desc Synchronize redux state with database.
 */
export function* syncNations() {
  try {
    const pangeaLib = yield call(getPangeaLibrary);
    const nations = yield call(pangeaLib.eth.nation.all);
    const mappedNations = nations.map(convertFromDatabase);
    yield put(doneSyncNations([...mappedNations]));
  } catch (e) {
    console.log('Sync nation error: ', e);
  }
}

/**
 * @desc Fetch nations from blockchain and synchronize redux state with current database state.
 */
export function* fetchNations() {
  try {
    console.log('fetching nations');
    yield call(syncNations);

    const pangeaLib = yield call(getPangeaLibrary);
    yield call(checkConnection);
    console.log('start syncing with blockchain');
    yield call(pangeaLib.eth.nation.index);
    console.log('synced with blockchain');
    yield call(syncNations);

    yield put(doneFetchNations());
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
