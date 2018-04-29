// @flow

import { NativeModules } from 'react-native';

export default class AccountsService {
  static async checkPasscode(accountStore: string, passcode: string): Promise<boolean> {
    const { Panthalassa } = NativeModules;
    const success = await Panthalassa.PanthalassaNewPanthalassa({ accountStore, pw: passcode });
    return success === true;
  }

  static async logout(): Promise<void> {
    const { Panthalassa } = NativeModules;
    Panthalassa.PanthalassaStop();
  }
}
