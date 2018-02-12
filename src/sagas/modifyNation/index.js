import { all, takeEvery } from 'redux-saga/effects';

import { DELETE_NATION_DRAFT, SAVE_NATION_DRAFT, SUBMIT_NATION } from '../../actions/modifyNation';
import { deleteDraftSaga, saveDraftSaga, submitNationSaga } from './sagas';

export default function* rootSaga() {
  yield takeEvery(SAVE_NATION_DRAFT, saveDraftSaga);
  yield takeEvery(DELETE_NATION_DRAFT, deleteDraftSaga);
  yield takeEvery(SUBMIT_NATION, submitNationSaga);
}
