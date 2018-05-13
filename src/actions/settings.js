// @flow

import { SettingsType } from '../types/Settings';

export type ChangeUseNumericPasscode = { +type: 'CHANGE_USE_NUMERIC_PASSCODE', useNumericPasscode: boolean };
export type ChangePasscodeLength = { +type: 'CHANGE_PASSCODE_LENGTH', passcodeLength: number };
export type ResetSettings = { +type: 'RESET_SETTINGS' };
export type LoadSettings = { +type: 'LOAD_SETTINGS', accountId: string, callback: (success: boolean) => void };
export type SaveSettings = { +type: 'SAVE_SETTINGS', accountId: string, callback: (success: boolean) => void };
export type SettingsUpdated = { +type: 'SETTINGS_UPDATED', settings: SettingsType };

export type Action =
  | ChangeUseNumericPasscode
  | ChangePasscodeLength
  | ResetSettings
  | LoadSettings
  | SaveSettings
  | SettingsUpdated;

export const CHANGE_USE_NUMERIC_PASSCODE = 'CHANGE_USE_NUMERIC_PASSCODE';
export const CHANGE_PASSCODE_LENGTH = 'CHANGE_PASSCODE_LENGTH';
export const RESET_SETTINGS = 'RESET_SETTINGS';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const SETTINGS_UPDATED = 'SETTINGS_UPDATED';

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

/**
 * @desc Action creator for an action that is called to save account settings to database.
 * @param {string} accountId Account id which settings are related to.
 * @param {function} callback Callback to be called when save is finished.
 * @returns {SaveSettings} An action.
 */
export function saveSettings(accountId: string, callback: (success: boolean) => void): SaveSettings {
  return {
    type: SAVE_SETTINGS,
    accountId,
    callback,
  };
}

/**
 * @desc Action creator for an action that is called to load account settings from database.
 * That one is used to load settings for account that is not logged in.
 * @param {string} accountId Account id which settings are related to.
 * @param {function} callback Callback to be called when save is finished.
 * @returns {LoadSettings} An action.
 */
export function loadSettings(accountId: string, callback: (success: boolean) => void): LoadSettings {
  return {
    type: LOAD_SETTINGS,
    accountId,
    callback,
  };
}

/**
 * @desc Action creator for an action that is called when settings is updated in database.
 * @param {SettingsType} settings Updated settings object.
 * @returns {SettingsUpdated} An action.
 */
export function settingsUpdated(settings: SettingsType): SettingsUpdated {
  return {
    type: SETTINGS_UPDATED,
    settings,
  };
}
