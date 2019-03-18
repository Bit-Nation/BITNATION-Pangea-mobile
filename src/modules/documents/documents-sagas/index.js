// @flow

import { all, takeEvery } from 'redux-saga/effects';
import { deleteDocument, fetchDocuments, saveDocument, uploadDocument } from './sagas';
import { SERVICES_CREATED } from 'pangea-common/serviceContainer-actions';
import { DELETE_DOCUMENT, FINISH_DOCUMENT_MODIFICATION, START_DOCUMENTS_FETCH, UPLOAD_DOCUMENT } from '../documents-actions';

/**
 * @desc Root DApps saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    yield takeEvery([SERVICES_CREATED, START_DOCUMENTS_FETCH], fetchDocuments),
    yield takeEvery(FINISH_DOCUMENT_MODIFICATION, saveDocument),
    yield takeEvery(DELETE_DOCUMENT, deleteDocument),
    yield takeEvery(UPLOAD_DOCUMENT, uploadDocument),
  ]);
}
