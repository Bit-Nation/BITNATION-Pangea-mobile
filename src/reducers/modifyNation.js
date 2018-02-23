// @flow

import _ from 'lodash';

import {
  START_NATION_CREATION,
  START_NATION_EDITING,
  RESET_NATION_CREATION,
  EDITING_NATION_FIELD_CHANGE,
  CANCEL_NATION_CREATE,
  SAVE_NATION_DRAFT,
  DELETE_NATION_DRAFT,
  SUBMIT_NATION,
  NATION_SUBMIT_FINISHED,
  NATION_DRAFT_SAVE_FINISHED,
  NATION_DRAFT_DELETE_FINISHED,
} from '../actions/modifyNation';
import type { EditingNationType } from '../types/Nation';
import type { Action } from '../actions/modifyNation';

type State = {
  editingNation: EditingNationType | null,
  initialNation: EditingNationType | null,
  inProgress: boolean,
  latestError: ?Error,
};

// $FlowFixMe
export const emptyNation: EditingNationType = {
  nationName: '',
  nationDescription: '',
  exists: false,
  virtualNation: null,
  nationCode: '',
  nationCodeLink: '',
  lawEnforcementMechanism: '',
  profit: false,
  decisionMakingProcess: '',
  diplomaticRecognition: false,
  governanceService: [],
  nonCitizenUse: false,
};

export const initialState: State = {
  editingNation: null,
  initialNation: null,
  inProgress: false,
  latestError: null,
};

/**
 * @desc Modify nation reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed Action.
 * @returns {State} Next state.
 */
export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case START_NATION_CREATION:
      return {
        ...state,
        initialNation: emptyNation,
        editingNation: emptyNation,
      };
    case START_NATION_EDITING:
      return {
        ...state,
        initialNation: action.nation,
        editingNation: action.nation,
      };
    case RESET_NATION_CREATION:
      return {
        ...state,
        editingNation: state.initialNation,
      };
    case EDITING_NATION_FIELD_CHANGE:
      return {
        ...state,
        editingNation: {
          ...state.editingNation,
          [action.field]: action.payload,
        },
      };
    case CANCEL_NATION_CREATE:
      return {
        ...state,
        editingNation: null,
        initialNation: null,
      };
    case SAVE_NATION_DRAFT:
      return {
        ...state,
        inProgress: true,
      };
    case DELETE_NATION_DRAFT:
      return {
        ...state,
        inProgress: true,
      };
    case SUBMIT_NATION:
      return {
        ...state,
        inProgress: true,
      };
    case NATION_SUBMIT_FINISHED:
      return {
        ...state,
        inProgress: false,
        latestError: action.error,
      };
    case NATION_DRAFT_SAVE_FINISHED:
      return {
        ...state,
        inProgress: false,
        latestError: action.error,
      };
    case NATION_DRAFT_DELETE_FINISHED:
      return {
        ...state,
        inProgress: false,
        latestError: action.error,
      };
    default:
      return state;
  }
}

/**
 * @desc Selector that checks if editing nation is modified compared to initial nation.
 * @param {State} state Current state.
 * @returns {boolean} Result.
 */
export function nationIsModified(state: State): boolean {
  return !_.isEqual(state.initialNation, state.editingNation);
}
