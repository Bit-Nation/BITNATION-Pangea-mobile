import config from 'react-native-config';

import { MAKE_STEP, RESET_STEPS, EMPTY_WALLET } from '../actions/testingMode';

const stepsCountToToggle = 5;

const initialState = {
  isActive: false,
  stepsLeftToToggle: stepsCountToToggle,
  walletEmpty: false,
};

export default function (state = initialState, action) {
  if (config.PRODUCTION === 'true') return state;

  switch (action.type) {
    case MAKE_STEP:
      if (state.stepsLeftToToggle === 1) {
        return { ...state, stepsLeftToToggle: stepsCountToToggle, isActive: !state.isActive };
      }
      return { ...state, stepsLeftToToggle: state.stepsLeftToToggle - 1 };
    case RESET_STEPS:
      return { ...state, stepsLeftToToggle: stepsCountToToggle };
    case EMPTY_WALLET:
      return { ...state, walletEmpty: !state.walletEmpty };
  }
  return state;
}


