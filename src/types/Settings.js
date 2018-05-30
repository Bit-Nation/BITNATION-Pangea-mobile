// @flow

export type SettingsItem =
  | 'identity'
  | 'security'
  | 'viewPrivateKey'
  | 'confirmPrivateKey';

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
