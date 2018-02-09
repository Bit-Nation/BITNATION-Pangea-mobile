import i18n from '../global/i18n';
import {
  START_NATION_CREATION,
  RESET_NATION,
  NATION_FIELD_CHANGE,
  CANCEL_NATION_CREATE,
} from '../actions/modifyNation';

export const emptyNation = {
  nationName: '',
  nationDescription: '',
  exists: false,
  virtualNation: [],
  nationCode: [],
  nationCodeLink: '',
  lawEnforcementMechanism: [],
  profit: false,
  decisionMakingProcess: [],
  diplomaticRecognition: false,
  governanceService: [],
  nonCitizenUse: false,
  agreeFees: false,
};

export const initialState = {
  editingNation: null,
  initialNation: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_NATION_CREATION:
      return {
        ...state,
        initialNation: emptyNation,
        editingNation: emptyNation,
      };
    case RESET_NATION:
      return {
        ...state,
        editingNation: state.initialNation,
      };
    case NATION_FIELD_CHANGE:
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
  }

  return state;
}
