// @flow

import {
  changePasscodeLength,
  changeUseNumericPasscode,
  loadSettings,
  resetSettings,
  saveSettings,
  settingsUpdated,
  CHANGE_PASSCODE_LENGTH,
  CHANGE_USE_NUMERIC_PASSCODE,
  LOAD_SETTINGS,
  RESET_SETTINGS,
  SAVE_SETTINGS,
  SETTINGS_UPDATED,
} from '../../../src/actions/settings';

describe('settings action creators', () => {
  test('changeUseNumericPasscode', () => {
    expect(changeUseNumericPasscode(true)).toEqual({
      type: CHANGE_USE_NUMERIC_PASSCODE,
      useNumericPasscode: true,
    });
  });

  test('changePasscodeLength', () => {
    expect(changePasscodeLength(6)).toEqual({
      type: CHANGE_PASSCODE_LENGTH,
      passcodeLength: 6,
    });
  });

  test('resetSettings', () => {
    expect(resetSettings()).toEqual({
      type: RESET_SETTINGS,
    });
  });

  test('saveSettings', () => {
    const callbackMock = jest.fn();
    expect(saveSettings('ID', callbackMock)).toEqual({
      type: SAVE_SETTINGS,
      accountId: 'ID',
      callback: callbackMock,
    });
  });

  test('loadSettings', () => {
    const callbackMock = jest.fn();
    expect(loadSettings('ID', callbackMock)).toEqual({
      type: LOAD_SETTINGS,
      accountId: 'ID',
      callback: callbackMock,
    });
  });

  test('settingsUpdated', () => {
    const settingsMock = {
      passcodeType: { type: 'password' },
    };
    expect(settingsUpdated(settingsMock)).toEqual({
      type: SETTINGS_UPDATED,
      settings: settingsMock,
    });
  });
});
