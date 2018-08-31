// @flow

import { call, put, select } from 'redux-saga/effects';
import DocumentsService from '../../services/documents';
import { documentsFetchFailed, documentsUpdated, startDocumentsFetch } from '../../actions/documents';
import type { Document } from '../../types/Documents';

/**
 * @desc Fetch list of documents.
 * @return {void}
 */
export function* fetchDocuments(): Generator<*, *, *> {
  try {
    const documents = yield call(DocumentsService.getDocuments);
    yield put(documentsUpdated(documents));
  } catch (error) {
    console.log(`[DOCUMENTS] Failed to get documents with error ${error.message}`);
    yield put(documentsFetchFailed(error));
  }
}

/**
 * @desc Fetch list of documents.
 * @return {void}
 */
export function* saveDocument(): Generator<*, *, *> {
  const { documents: { modification } } = yield select();
  if (modification === null) return;
  const document: Document = modification.new;
  if (document === null) return;

  try {
    yield call(DocumentsService.saveDocument, document);
    yield put(startDocumentsFetch());
  } catch (error) {
    console.log(`[DOCUMENTS] Failed to save document: ${JSON.stringify(document)}, with error ${error.message}`);
  }
}
