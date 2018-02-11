import { all, takeEvery } from 'redux-saga/effects';

import { SAVE_NATION_DRAFT } from '../../actions/modifyNation';
import { saveDraftSaga } from './sagas';


function* watchSaveNationDraft() {
  yield takeEvery(SAVE_NATION_DRAFT, saveDraftSaga);
}

export default function* rootSaga() {
  yield all([
    watchSaveNationDraft(),
  ]);
}
