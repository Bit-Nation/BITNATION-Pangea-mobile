// @flow

import config from 'react-native-config';

import {
  type Action,
  MAKE_STEP,
  RESET_STEPS,
  EMPTY_WALLET,
} from '../actions/testingMode';

export const stepsCountToToggle = 5;

type State = {
  +isActive: boolean,
  +stepsLeftToToggle: number,
  +walletEmpty: boolean,
};

export const initialState: State = {
  isActive: false,
  stepsLeftToToggle: stepsCountToToggle,
  walletEmpty: false,
};

/**
 * @desc Testing mode reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
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
    default:
      return state;
  }
};

