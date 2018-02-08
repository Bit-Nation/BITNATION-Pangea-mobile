import i18n from '../global/i18n';
import { START_NATION_CREATION } from '../actions/createNation';

export const initialState = {
  nationName: '',
  nationDescription: '',
  exists: false,
  virtualNation: [i18n.t('enums.nation.locationType.geographical')],
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
  }

  return state;
}
