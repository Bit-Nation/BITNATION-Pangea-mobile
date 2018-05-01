// @flow

import { NativeModules } from 'react-native';

export default class AccountsService {
  static async checkPasscode(accountStore: string, password: string): Promise<boolean> {
    const { Panthalassa } = NativeModules;
    const success = await Panthalassa.PanthalassaNewPanthalassa({ accountStore, pw: password });
    return success === true;
  }

  static async createAccountStore(password: string): Promise<string> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaNewAccountKeys({ pw: password, pwConfirm: password });
  }

  static async exportAccountStore(password: string): Promise<string> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaExport({ pw: password, pwConfirm: password });
  }

  static async logout(): Promise<void> {
    const { Panthalassa } = NativeModules;
    Panthalassa.PanthalassaStop();
  }
}
