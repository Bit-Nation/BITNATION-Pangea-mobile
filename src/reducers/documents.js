// @flow

import _ from 'lodash';

import {
  type Action,
  START_DOCUMENTS_FETCH,
  DOCUMENTS_FETCH_FAILED,
  DOCUMENTS_UPDATED,
  START_DOCUMENT_CREATION,
  START_DOCUMENT_EDITING,
  CANCEL_DOCUMENT_MODIFICATION,
  UPDATE_MODIFIED_DOCUMENT_FIELD,
  OPEN_DOCUMENT,
} from '../actions/documents';
import { SERVICES_DESTROYED } from '../actions/serviceContainer';
import type { Document, EditingDocument } from '../types/Documents';

export type State = {
  isFetching: boolean,
  documents: Array<Document>,
  openedDocumentId: number | null,
  modification: {
    initial: Document | null,
    new: EditingDocument,
  } | null,
  fetchError: Error | null,
};

export const initialState: State = {
  isFetching: false,
  documents: [],
  openedDocumentId: null,
  modification: null,
  fetchError: null,
};

const emptyDocument: EditingDocument = {
  id: null,
  name: '',
  description: '',
  data: null,
  mimeType: '',
};

export const getDocument = (state: State, id: number) => _.find(state.documents, document => document.id === id);
export const getOpenedDocument = (state: State) => (state.openedDocumentId === null ? null : getDocument(state, state.openedDocumentId));

/**
 * @desc Activity reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SERVICES_DESTROYED:
      return initialState;
    case START_DOCUMENTS_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchError: null,
      };
    case DOCUMENTS_FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        fetchError: action.error,
      };
    case DOCUMENTS_UPDATED:
      return {
        ...state,
        isFetching: false,
        documents: [...action.documents],
      };
    case START_DOCUMENT_CREATION:
      return {
        ...state,
        modification: {
          initial: null,
          new: emptyDocument,
        },
      };
    case START_DOCUMENT_EDITING: {
      const { documentId } = action;
      const document = getDocument(state, documentId);
      if (document == null) {
        return state;
      }

      return {
        ...state,
        modification: {
          initial: document,
          new: emptyDocument,
        },
      };
    }
    case CANCEL_DOCUMENT_MODIFICATION:
      return {
        ...state,
        modification: null,
      };
    case OPEN_DOCUMENT:
      return {
        ...state,
        openedDocumentId: action.documentId,
      };
    case UPDATE_MODIFIED_DOCUMENT_FIELD: {
      const { modification } = state;
      if (modification === null) {
        return state;
      }

      const { field, value } = action;

      return {
        ...state,
        modification: {
          ...modification,
          new: {
            ...modification.new,
            [field]: value,
          },
        },
      };
    }
    default:
      return state;
  }
};

