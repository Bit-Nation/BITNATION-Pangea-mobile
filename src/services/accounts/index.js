// @flow

import { NativeModules } from 'react-native';
import type { Mnemonic } from '../../types/Mnemonic';
import { compressMnemonic, decompressMnemonic } from '../../utils/key';
import type { Profile } from '../../types/Account';
import { InvalidPasswordError } from '../../global/errors/accounts';
import ChatService from '../chat';
import {
  panthalassaStart,
  panthalassaStop,
  panthalassaGetMnemonic,
  panthalassaNewAccountKeys,
  panthalassaNewAccountKeysFromMnemonic,
  panthalassaExportAccountStore,
  panthalassaIsValidMnemonic,
  panthalassaEthPrivateKey,
  panthalassaSignProfileStandAlone,
  panthalassaSignProfile
} from '../panthalassa';

export default class AccountsService {
  static async getMnemonic(): Promise<Mnemonic> {
    const mnemonicString = await panthalassaGetMnemonic();
    return decompressMnemonic(mnemonicString);
  }

  static async checkPasscode(accountStore: string, profile: Profile, password: string): Promise<boolean> {
    // @todo Change implementation so it do not restart Panthalassa.
    return AccountsService.login(accountStore, profile, password);
  }

  static async login(accountStore: string, profile: Profile, password: string): Promise<boolean> {
    try {
      await panthalassaStop();
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

    try {
      await panthalassaStart(config, password);
    } catch (e) {
      console.log(`[TEST] Panthalassa start failed: ${e.message}`);
      return false;
    }

    try {
      await ChatService.uploadProfile(signedProfile);
    } catch (e) {
      console.log(`[TEST] Profile upload fail: ${e.message}`);
    }

    return true;
  }

  static async createAccountStore(password: string): Promise<string> {
    return panthalassaNewAccountKeys(password);
  }

  static async restoreAccountStore(mnemonic: string, password: string): Promise<string> {
    return panthalassaNewAccountKeysFromMnemonic(mnemonic, password);
  }

  static async exportAccountStore(password: string): Promise<string> {
    return panthalassaExportAccountStore(password);
  }

  static async logout(): Promise<boolean> {
    return panthalassaStop();
  }

  static async validateMnemonic(mnemonic: Mnemonic): Promise<boolean> {
    return panthalassaIsValidMnemonic(compressMnemonic(mnemonic));
  }

  static async getEthPrivateKey(): Promise<string> {
    return panthalassaEthPrivateKey();
  }

  static async signProfileStandalone(profile: Profile, accountStore: string, password: string): Promise<string> {
    return panthalassaSignProfileStandAlone(
      profile.name,
      profile.location || '',
      profile.avatar || '',
      accountStore,
      password
    );
  }

  static async signProfile(profile: Profile): Promise<string> {
    return panthalassaSignProfile(
      profile.name,
      profile.location || '',
      profile.avatar || '',
    );
  }
}
