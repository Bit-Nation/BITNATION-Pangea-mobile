// @flow

import { NativeModules } from 'react-native';
import type { Mnemonic } from '../../types/Mnemonic';
import { compressMnemonic } from '../../utils/key';

export default class AccountsService {
  static async checkPasscode(accountStore: string, password: string): Promise<boolean> {
    const { Panthalassa } = NativeModules;
    await Panthalassa.PanthalassaStop();
    const success = await Panthalassa.PanthalassaNewPanthalassa({ accountStore, pw: password });
    return success === true;
  }

  static async createAccountStore(password: string): Promise<string> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaNewAccountKeys({ pw: password, pwConfirm: password });
  }

  static async restoreAccountStore(mnemonic: Mnemonic, password: string): Promise<string> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaNewAccountKeys({
      mnemonic: compressMnemonic(mnemonic),
      pw: password,
      pwConfirm: password,
    });
  }

  static async exportAccountStore(password: string): Promise<string> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaExport({ pw: password, pwConfirm: password });
  }

  static async logout(): Promise<void> {
    const { Panthalassa } = NativeModules;
    Panthalassa.PanthalassaStop();
  }

  static async validateMnemonic(mnemonic: Mnemonic): Promise<boolean> {
    // @todo use Panthalassa method.
    return mnemonic.indexOf('1') === -1;
  }
}
