// @flow

import type { SettingsType } from '../../types/Settings';
import { type AccountSettingsType as DBSettings } from '../../services/database/schemata';
import { MINIMAL_PIN_CODE_LENGTH } from '../../global/Constants';

/**
 * @desc Converts Realm object to app-level plain model.
 * @param {DBSettings} settings Realm settings object.
 * @return {Settings} Converted settings object.
 */
export function convertFromDatabase(settings: DBSettings): SettingsType {
  return {
    passcodeType: settings.passcodeType === 'pinCode' ?
      {
        type: 'pinCode',
        length: settings.pinCodeLength || MINIMAL_PIN_CODE_LENGTH,
      } : {
        type: 'password',
      },
  };
}

/**
 * @desc Converts creating settings to Realm object if it's possible.
 * @param {SettingsType} settings Settings object to be converted.
 * @param {string} accountId Account of id that is settings related to.
 * @return {DBSettings} Converted object.
 */
export function convertToDatabase(settings: SettingsType, accountId: string): DBSettings {
  return {
    id: accountId,
    passcodeType: settings.passcodeType.type,
    pinCodeLength: settings.passcodeType.type === 'pinCode' ? settings.passcodeType.length : null,
  };
}
