import i18n from '../global/i18n';
import {
  START_NATION_CREATION,
  RESET_NATION,
  NATION_FIELD_CHANGE,
  CANCEL_NATION_CREATE,
  NATION_CREATE,
  EDITING_NATION_FIELD,
} from '../actions/createNation';

export const initialState = {
  editingNation: null,
  initialNation: null,
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
  agreeFees: false
};

export default function (state = initialState, action) {
  switch(action.type) {
    case START_NATION_CREATION:
      return initialState;
    case RESET_NATION:
      return {
        initialState,
      };
    case NATION_FIELD_CHANGE:
      return {
        ...state,
        [action.field]:action.payload,
      };
    case CANCEL_NATION_CREATE:
      return {
        ...state,
        creatingNation: null
      };
    case NATION_CREATE:
      return {
        ...state,
        creatingNation: action.payload,
        inProgress: true
      };
    case EDITING_NATION_FIELD:
      return {
        ...state,
        editingNation: {...initialNation},
      };
  }

  return state;
}
