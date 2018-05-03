// @flow

export type ChangeUseNumericPasscode = { +type: 'CHANGE_USE_NUMERIC_PASSCODE', useNumericPasscode: boolean };
export type ChangePasscodeLength = { +type: 'CHANGE_PASSCODE_LENGTH', passcodeLength: number };
export type ResetSettings = { +type: 'RESET_SETTINGS' };

export type Action =
  | ChangeUseNumericPasscode
  | ChangePasscodeLength
  | ResetSettings;

export const CHANGE_USE_NUMERIC_PASSCODE = 'CHANGE_USE_NUMERIC_PASSCODE';
export const CHANGE_PASSCODE_LENGTH = 'CHANGE_PASSCODE_LENGTH';
export const RESET_SETTINGS = 'RESET_SETTINGS';

/**
 * @desc Action creator for an action that is called when desired using of numeric passcode should be changed.
 * @param {boolean} useNumericPasscode Boolean value, whether to use numeric passcode or not.
 * @returns {ChangeUseNumericPasscode} An action.
 */
export function changeUseNumericPasscode(useNumericPasscode: boolean): ChangeUseNumericPasscode {
  return {
    type: CHANGE_USE_NUMERIC_PASSCODE,
    useNumericPasscode,
  };
}

/**
 * @desc Action creator for an action that is called when desired passcode should be changed.
 * @param {boolean} passcodeLength New desired length value.
 * @returns {ChangeUseNumericPasscode} An action.
 */
export function changePasscodeLength(passcodeLength: number): ChangePasscodeLength {
  return {
    type: CHANGE_PASSCODE_LENGTH,
    passcodeLength,
  };
}

/**
 * @desc Action creator for an action that is called to reset settings state to initial one.
 * @returns {ResetSettings} An action.
 */
export function resetSettings(): ResetSettings {
  return {
    type: RESET_SETTINGS,
  };
}
