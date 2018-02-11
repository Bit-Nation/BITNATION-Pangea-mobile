import i18n from '../global/i18n';
import {
  START_NATION_CREATION,
  RESET_NATION_CREATION,
  EDITING_NATION_FIELD_CHANGE,
  CANCEL_NATION_CREATE,
  SAVE_NATION_DRAFT,
  DELETE_NATION_DRAFT,
  SUBMIT_NATION, NATION_SUBMIT_FINISHED, NATION_DRAFT_SAVE_FINISHED, NATION_DRAFT_DELETE_FINISHED,
} from '../actions/modifyNation';

export const emptyNation = {
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

export const initialState = {
  editingNation: null,
  initialNation: null,
  inProgress: false,
  latestError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_NATION_CREATION:
      return {
        ...state,
        initialNation: emptyNation,
        editingNation: emptyNation,
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
  }

  return state;
}
