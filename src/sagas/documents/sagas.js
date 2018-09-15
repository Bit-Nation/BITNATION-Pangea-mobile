// @flow

import { call, put, select } from 'redux-saga/effects';
import DocumentsService from '../../services/documents';
import { documentsFetchFailed, documentsUpdated, startDocumentsFetch } from '../../actions/documents';
import type { Document } from '../../types/Documents';
import type { DeleteDocumentAction, UploadDocumentAction } from '../../actions/documents';

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
 * @desc Saves document.
 * @return {void}
 */
export function* saveDocument(): Generator<*, *, *> {
  const { documents: { modification } } = yield select();
  if (modification === null) return;
  const document: Document = modification.new;
  if (document === null) return;

  try {
    if (modification.new.id !== null) {
      yield call(DocumentsService.updateDocument, document);
    } else {
      yield call(DocumentsService.saveDocument, document);
    }
    yield put(startDocumentsFetch());
  } catch (error) {
    console.log(`[DOCUMENTS] Failed to save document: ${JSON.stringify(document)}, with error ${error.message}`);
  }
}

/**
 * @desc Deletes document.
 * @param {DeleteDocumentAction} action An action.
 * @return {void}
 */
export function* deleteDocument(action: DeleteDocumentAction): Generator<*, *, *> {
  const { documentId } = action;

  try {
    yield call(DocumentsService.deleteDocument, documentId);
    yield put(startDocumentsFetch());
  } catch (error) {
    console.log(`[DOCUMENTS] Failed to delete document with id: ${documentId}, with error ${error.message}`);
  }
}

/**
 * @desc Uploads document.
 * @param {UploadDocumentAction} action An action.
 * @return {void}
 */
export function* uploadDocument(action: UploadDocumentAction): Generator<*, *, *> {
  const { documentId } = action;

  try {
    yield call(DocumentsService.uploadDocument, documentId);
    yield put(startDocumentsFetch());
  } catch (error) {
    console.log(`[DOCUMENTS] Failed to upload document with id: ${documentId}, with error ${error.message}`);
  }
}
