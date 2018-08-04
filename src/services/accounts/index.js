// @flow

import { NativeModules } from 'react-native';
import type { Mnemonic } from '../../types/Mnemonic';
import { compressMnemonic, decompressMnemonic } from '../../utils/key';
import type { Profile } from '../../types/Account';
import { InvalidPasswordError } from '../../global/errors/accounts';
import ChatService from '../chat';

export default class AccountsService {
  static async getMnemonic(): Promise<Mnemonic> {
    const { Panthalassa } = NativeModules;
    const mnemonicString = await Panthalassa.PanthalassaGetMnemonic();
    return decompressMnemonic(mnemonicString);
  }

  static async checkPasscode(accountStore: string, profile: Profile, password: string): Promise<boolean> {
    // @todo Change implementation so it do not restart Panthalassa.
    return AccountsService.login(accountStore, profile, password);
  }

  static async login(accountStore: string, profile: Profile, password: string): Promise<boolean> {
    const { Panthalassa } = NativeModules;
    try {
      await Panthalassa.PanthalassaStop();
      // eslint-disable-next-line no-empty
    } catch (e) {
      // We ignore exception, since we just need stop it in case it was started earlier.
    }
    const signedProfile = await AccountsService.signProfileStandalone(profile, accountStore, password).catch(() => {
      throw new InvalidPasswordError();
    });
    const config = JSON.stringify({
      encrypted_key_manager: accountStore,
      signed_profile: signedProfile,
      enable_debugging: false,
    });

    const success = await Panthalassa.PanthalassaStart({ config, password });

    if (success === true) {
      try {
        await ChatService.uploadProfile(signedProfile);
      } catch (e) {
        console.log(`[TEST] Profile upload fail: ${e.message}`);
      }
      return true;
    }
    return false;
  }

  static async createAccountStore(password: string): Promise<string> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaNewAccountKeys({ pw: password, pwConfirm: password });
  }

  static async restoreAccountStore(mnemonic: Mnemonic, password: string): Promise<string> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaNewAccountKeysFromMnemonic({
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

  static async getEthPrivateKey(): Promise<string> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaEthPrivateKey();
  }

  static async signProfileStandalone(profile: Profile, accountStore: string, password: string): Promise<string> {
    const { Panthalassa } = NativeModules;

    return Panthalassa.PanthalassaSignProfileStandAlone({
      name: profile.name,
      location: profile.location || '',
      image: profile.avatar || '',
      keyManagerStore: accountStore,
      password,
    });
  }

  static async signProfile(profile: Profile): Promise<string> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaSignProfile({
      name: profile.name,
      location: profile.location || '',
      image: profile.avatar || '',
    });
  }
}
