// @flow

import { NativeModules } from 'react-native';
import type { Mnemonic } from '../../types/Mnemonic';
import { compressMnemonic } from '../../utils/key';

export default class AccountsService {
  static async getMnemonic(): Promise<Mnemonic> {
    // @todo Change mock with correct implementation.
    return ['hospital', 'school', 'quote', 'wild', 'alpha', 'adapt', 'timber', 'jump', 'ugly', 'remain', 'goose', 'maple', 'maze', 'piano', 'beyond', 'copper', 'address', 'sand', 'meat', 'dilemma', 'rotate', 'core', 'twin', 'ribbon'];
  }

  static async checkPasscode(accountStore: string, password: string): Promise<boolean> {
    // @todo Change implementation so it do not restart Panthalassa.
    return AccountsService.login(accountStore, password);
  }

  static async login(accountStore: string, password: string): Promise<boolean> {
    const { Panthalassa } = NativeModules;
    try {
      await Panthalassa.PanthalassaStop();
      // eslint-disable-next-line no-empty
    } catch (e) {
      // We ignore exception, since we just need stop it in case it was started earlier.
    }
    const success = await Panthalassa.PanthalassaStart({ accountStore, password });
    return success === true;
  }

  static async createAccountStore(password: string): Promise<string> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaNewAccountKeys({ pw: password, pwConfirm: password });
  }

  static async restoreAccountStore(mnemonic: Mnemonic, password: string): Promise<string> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaNewAccountKeys({
      mne: compressMnemonic(mnemonic),
      pw: password,
      pwConfirm: password,
    });
  }

  static async exportAccountStore(password: string): Promise<string> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaExportAccountStore({ pw: password, pwConfirm: password });
  }

  static async logout(): Promise<void> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaStop();
  }

  static async validateMnemonic(mnemonic: Mnemonic): Promise<boolean> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaIsValidMnemonic(compressMnemonic(mnemonic));
  }
}
