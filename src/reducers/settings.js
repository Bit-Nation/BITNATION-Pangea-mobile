// @flow

import {
  type Action, CHANGE_PASSCODE_LENGTH, CHANGE_USE_NUMERIC_PASSCODE, RESET_SETTINGS,
  SETTINGS_UPDATED,
} from '../actions/settings';
import type { SettingsType } from '../types/Settings';
import { SERVICES_DESTROYED } from '../actions/serviceContainer';
import type { ServicesDestroyedAction } from '../actions/serviceContainer';

export type State = SettingsType

export const PasscodeTypeValues = {
  password: {
    type: 'password',
  },
  pinCode: {
    type: 'pinCode',
    length: 6,
  },
};

export const initialState: State = {
  passcodeType: PasscodeTypeValues.password,
};

/**
 * @desc Settings reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action | ServicesDestroyedAction): State => {
  switch (action.type) {
    case SERVICES_DESTROYED:
      return initialState;
    case CHANGE_USE_NUMERIC_PASSCODE: {
      const desiredValue = action.useNumericPasscode ? PasscodeTypeValues.pinCode : PasscodeTypeValues.password;
      return (state.passcodeType.type === desiredValue.type) ?
        state :
        {
          ...state,
          passcodeType: desiredValue,
        };
    }
    case CHANGE_PASSCODE_LENGTH: {
      return (state.passcodeType.type !== 'pinCode') ?
        state :
        {
          ...state,
          passcodeType: {
            type: 'pinCode',
            length: action.passcodeLength,
          },
        };
    }
    case SETTINGS_UPDATED:
      return {
        ...state,
        ...action.settings,
      };
    case RESET_SETTINGS: {
      return initialState;
    }
    default:
      return state;
  }
};
