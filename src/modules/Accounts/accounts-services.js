// @flow

import Config from 'react-native-config';
import type { Mnemonic } from 'pangea-common/types/Mnemonic-types';
import { compressMnemonic, decompressMnemonic } from '@pangea/key/key-utils';
import type { NetworkType, Profile } from 'pangea-common/types/Accounts-types';
import { InvalidPasswordError } from 'pangea-common/errors/accounts';
import ChatService from '@pangea/chat/chat-service';
import {
  panthalassaStart,
  panthalassaStartFromMnemonic,
  panthalassaStop,
  panthalassaGetMnemonic,
  panthalassaNewAccountKeys,
  panthalassaNewAccountKeysFromMnemonic,
  panthalassaExportAccountStore,
  panthalassaIsValidMnemonic,
  panthalassaEthPrivateKey,
  panthalassaSignProfileStandAlone,
  panthalassaSignProfile,
} from '@pangea/panthalassa';

export default class AccountsService {
  static async getMnemonic(): Promise<Mnemonic> {
    const mnemonicString = await panthalassaGetMnemonic();
    return decompressMnemonic(mnemonicString);
  }

  static async checkPasscode(accountStore: string, profile: Profile, password: string, networkType: NetworkType): Promise<boolean> {
    // @todo Change implementation so it do not restart Panthalassa.
    return AccountsService.login(accountStore, profile, password, networkType);
  }

  static async login(accountStore: string, profile: Profile, password: string, networkType: NetworkType): Promise<boolean> {
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
      eth_ws_endpoint: networkType === 'main' ? 'wss://mainnet.infura.io/ws' : 'wss://rinkeby.infura.io/ws',
      private_chat_endpoint: Config.CHAT_WSS_ENDPOINT,
      private_chat_bearer_token: Config.CHAT_TOKEN,
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

  static async validateMnemonicWithAccount(accountStore: string, profile: Profile, mne: Mnemonic): Promise<boolean> {
    try {
      await panthalassaStop();
      // eslint-disable-next-line no-empty
    } catch (e) {
      // We ignore exception, since we just need stop it in case it was started earlier.
    }
    const config = JSON.stringify({
      encrypted_key_manager: accountStore,
      enable_debugging: false,
      eth_ws_endpoint: 'wss://mainnet.infura.io/ws',
      private_chat_endpoint: Config.CHAT_WSS_ENDPOINT,
      private_chat_bearer_token: Config.CHAT_TOKEN,
    });

    try {
      await panthalassaStartFromMnemonic(config, compressMnemonic(mne));
    } catch (e) {
      console.log(`[TEST] Panthalassa start failed: ${e.message}`);
      return false;
    }

    return true;
  }

  static async createAccountStore(password: string): Promise<string> {
    return panthalassaNewAccountKeys(password);
  }

  static async restoreAccountStore(mnemonic: Mnemonic, password: string): Promise<string> {
    return panthalassaNewAccountKeysFromMnemonic(compressMnemonic(mnemonic), password);
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
      password,
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
