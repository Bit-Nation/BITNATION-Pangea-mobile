import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { CANCEL_NATION_CREATE, DONE_NATION_CREATE } from '../actions/nations';



function* doneNationCreation() {
  yield put({ type: DONE_NATION_CREATE });
}

function* cancelNationCreation() {
  yield put({ type: CANCEL_NATION_CREATE });
}

export default function* watchProfileUpdate() {
  yield takeEvery(DONE_NATION_CREATE, doneNationCreation);
  yield takeEvery(CANCEL_NATION_CREATE, cancelNationCreation);
}