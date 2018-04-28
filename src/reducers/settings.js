// @flow

import { type Action, CHANGE_PASSCODE_LENGTH, CHANGE_USE_NUMERIC_PASSCODE } from '../actions/settings';

export type PasscodeInfo =
  {
    type: 'pinCode',
    length: number,
  } |
  {
    type: 'password',
  };

export type State = {
  +passcodeInfo: PasscodeInfo,
};

export const initialState: State = {
  passcodeInfo: {
    type: 'password',
  },
};

export const PasscodeKind = {
  password: {
    type: 'password',
  },
  pinCode: {
    type: 'pinCode',
    length: 6,
  },
};

/**
 * @desc Settings reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CHANGE_USE_NUMERIC_PASSCODE: {
      const desiredKind = action.useNumericPasscode ? PasscodeKind.pinCode : PasscodeKind.password;
      return (state.passcodeInfo.type === desiredKind) ?
        state :
        {
          ...state,
          passcodeInfo: desiredKind,
        };
    }
    case CHANGE_PASSCODE_LENGTH: {
      return (state.passcodeInfo.type !== 'pinCode') ?
        state :
        {
          ...state,
          passcodeInfo: {
            type: 'pinCode',
            length: action.passcodeLength,
          },
        };
    }
    default:
      return state;
  }
};
