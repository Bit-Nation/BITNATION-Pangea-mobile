import { all, takeEvery } from 'redux-saga/effects';

import { DELETE_NATION_DRAFT, SAVE_NATION_DRAFT } from '../../actions/modifyNation';
import { deleteDraftSaga, saveDraftSaga } from './sagas';


function* watchSaveNationDraft() {
  yield takeEvery(SAVE_NATION_DRAFT, saveDraftSaga);
  yield takeEvery(DELETE_NATION_DRAFT, deleteDraftSaga);
}

export default function* rootSaga() {
  yield all([
    watchSaveNationDraft(),
  ]);
}
