// @flow

import { all, takeEvery } from 'redux-saga/effects';
import { deleteDocument, fetchDocuments, saveDocument } from './sagas';
import { SERVICES_CREATED } from '../../actions/serviceContainer';
import { DELETE_DOCUMENT, FINISH_DOCUMENT_MODIFICATION, START_DOCUMENTS_FETCH } from '../../actions/documents';

/**
 * @desc Root DApps saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    yield takeEvery([SERVICES_CREATED, START_DOCUMENTS_FETCH], fetchDocuments),
    yield takeEvery(FINISH_DOCUMENT_MODIFICATION, saveDocument),
    yield takeEvery(DELETE_DOCUMENT, deleteDocument),
  ]);
}
