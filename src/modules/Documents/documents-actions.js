// @flow

import type { Document } from './Documents-types';

export const START_DOCUMENTS_FETCH = 'START_DOCUMENTS_FETCH';
export const DOCUMENTS_UPDATED = 'DOCUMENTS_UPDATED';
export const DOCUMENTS_FETCH_FAILED = 'DOCUMENTS_FETCH_FAILED';
export const START_DOCUMENT_CREATION = 'START_DOCUMENT_CREATION';
export const START_DOCUMENT_EDITING = 'START_DOCUMENT_EDITING';
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
export const UPDATE_MODIFIED_DOCUMENT_FIELD = 'UPDATE_MODIFIED_DOCUMENT_FIELD';
export const FINISH_DOCUMENT_MODIFICATION = 'FINISH_DOCUMENT_MODIFICATION';
export const CANCEL_DOCUMENT_MODIFICATION = 'CANCEL_DOCUMENT_MODIFICATION';
export const OPEN_DOCUMENT = 'OPEN_DOCUMENT';
export const UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT';

export type StartDocumentsFetchAction = { +type: 'START_DOCUMENTS_FETCH' };
export type DocumentsUpdatedAction = { +type: 'DOCUMENTS_UPDATED', documents: Array<Document> };
export type DocumentsFetchFailedAction = { +type: 'DOCUMENTS_FETCH_FAILED', +error: Error };
export type StartDocumentCreationAction = { +type: 'START_DOCUMENT_CREATION', +content: string };
export type StartDocumentEditingAction = { +type: 'START_DOCUMENT_EDITING', documentId: number };
export type DeleteDocumentAction = { +type: 'DELETE_DOCUMENT', documentId: number };
export type UpdateModifiedDocumentFieldAction = { +type: 'UPDATE_MODIFIED_DOCUMENT_FIELD', field: string, value: any };
export type FinishDocumentModificationAction = { +type: 'FINISH_DOCUMENT_MODIFICATION' };
export type CancelDocumentModificationAction = { +type: 'CANCEL_DOCUMENT_MODIFICATION' };
export type OpenDocumentAction = { +type: 'OPEN_DOCUMENT', documentId: number };
export type UploadDocumentAction = { +type: 'UPLOAD_DOCUMENT', documentId: number};

export type Action =
  | StartDocumentsFetchAction
  | DocumentsUpdatedAction
  | DocumentsFetchFailedAction
  | StartDocumentCreationAction
  | StartDocumentEditingAction
  | DeleteDocumentAction
  | UpdateModifiedDocumentFieldAction
  | FinishDocumentModificationAction
  | CancelDocumentModificationAction
  | OpenDocumentAction
  | UploadDocumentAction;

/**
 * @desc Action creator for an action that requests fetch of all documents.
 * @returns {StartDocumentsFetchAction} An action
 */
export function startDocumentsFetch(): StartDocumentsFetchAction {
  return {
    type: START_DOCUMENTS_FETCH,
  };
}

/**
 * @desc Action creator for an action that is called when the whole documents list is updated.
 * @param {Document[]} documents New documents list.
 * @returns {DocumentsUpdatedAction} An action
 */
export function documentsUpdated(documents: Array<Document>): DocumentsUpdatedAction {
  return {
    type: DOCUMENTS_UPDATED,
    documents,
  };
}

/**
 * @desc Action creator for an action that is called when documents fetch failed.
 * @param {Error} error Fetching error
 * @returns {DocumentsFetchFailedAction} An action
 */
export function documentsFetchFailed(error: Error): DocumentsFetchFailedAction {
  return {
    type: DOCUMENTS_FETCH_FAILED,
    error,
  };
}

/**
 * @desc Action creator for an action that initiates document creation.
 * @param {string} content Content of file that is going to be created.
 * @returns {StartDocumentCreationAction} An action
 */
export function startDocumentCreation(content: string): StartDocumentCreationAction {
  return {
    type: START_DOCUMENT_CREATION,
    content,
  };
}

/**
 * @desc Action creator for an action that initiates document editing.
 * @param {number} documentId Id of document to edit.
 * @returns {StartDocumentCreationAction} An action
 */
export function startDocumentEditing(documentId: number): StartDocumentEditingAction {
  return {
    type: START_DOCUMENT_EDITING,
    documentId,
  };
}

/**
 * @desc Action creator for an action that initiates document deleting.
 * @param {number} documentId Id of document to delete.
 * @returns {DeleteDocumentAction} An action
 */
export function deleteDocument(documentId: number): DeleteDocumentAction {
  return {
    type: DELETE_DOCUMENT,
    documentId,
  };
}

/**
 * @desc Action creator for an action that initiates document editing.
 * @param {string} field Name of field to be changed.
 * @param {any} value New value of the field.
 * @returns {UpdateModifiedDocumentFieldAction} An action
 */
export function updateModifiedDocumentField(field: string, value: any): UpdateModifiedDocumentFieldAction {
  return {
    type: UPDATE_MODIFIED_DOCUMENT_FIELD,
    field,
    value,
  };
}

/**
 * @desc Action creator for an action that finalizes document modification (creation or editing).
 * @returns {FinishDocumentModificationAction} An action
 */
export function finishDocumentModification(): FinishDocumentModificationAction {
  return {
    type: FINISH_DOCUMENT_MODIFICATION,
  };
}

/**
 * @desc Action creator for an action that cancels document modification (creation or editing).
 * @returns {CancelDocumentModificationAction} An action
 */
export function cancelDocumentModification(): CancelDocumentModificationAction {
  return {
    type: CANCEL_DOCUMENT_MODIFICATION,
  };
}

/**
 * @desc Action creator for an action that opens a document.
 * @param {number} documentId Id of document to be opened.
 * @returns {OpenDocumentAction} An action
 */
export function openDocument(documentId: number): OpenDocumentAction {
  return {
    type: OPEN_DOCUMENT,
    documentId,
  };
}

/**
 * @desc Action creator for an action that uploads a document.
 * @param {number} documentId Id of document to be uploaded.
 * @returns {UploadDocumentAction} An action
 */
export function uploadDocument(documentId: number): UploadDocumentAction {
  return {
    type: UPLOAD_DOCUMENT,
    documentId,
  };
}
