// @flow

export type SettingsItem = 'identity' | 'security';

export type PasscodeType =
  {
    type: 'pinCode',
    length: number,
  } |
  {
    type: 'password',
  };

export type SettingsType = {
  passcodeType: PasscodeType,
};
