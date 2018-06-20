// @flow

import { NativeModules } from 'react-native';
import Config from 'react-native-config';
import type { Profile } from '../../types/Account';

export default class ChatService {
  static async uploadProfile(profile: string): Promise {
    const URL = `${Config.CHAT_ENDPOINT}/profile`;
    await fetch(URL, {
      body: profile,
      headers: {
        'content-type': 'application/json',
        bearer: Config.CHAT_TOKEN,
      },
      method: 'PUT',
    });
    const bundleCountResponse = await ChatService.getPreKeyBundleCount();
    if (bundleCountResponse.count === 0) {
      return ChatService.uploadPreKeyBundle();
    }
    return Promise.resolve({
      result: 'success',
    });
  }

  static async getProfile(publicKey: string): Promise {
    const URL = `${Config.CHAT_ENDPOINT}/profile/${publicKey}`;
    return fetch(URL, {
      headers: {
        'content-type': 'application/json',
        bearer: Config.CHAT_TOKEN,
      },
      method: 'GET',
    })
      .then(response => response.json());
  }

  static async getPreKeyBundleCount(): Promise<number> {
    const { Panthalassa } = NativeModules;
    const publicKey = await Panthalassa.PanthalassaIdentityPublicKey();
    const URL = `${Config.CHAT_ENDPOINT}/pre-key-bundle/count/${publicKey}`;
    return fetch(URL, {
      headers: {
        'content-type': 'application/json',
        bearer: Config.CHAT_TOKEN,
      },
      method: 'GET',
    })
      .then(response => response.json());
  }

  static async uploadPreKeyBundle(): Promise {
    const { Panthalassa } = NativeModules;
    let preKeyBundle = await Panthalassa.PanthalassaNewPreKeyBundle();
    preKeyBundle = JSON.parse(preKeyBundle);
    const URL = `${Config.CHAT_ENDPOINT}/pre-key-bundle`;
    return fetch(URL, {
      body: preKeyBundle.public_part,
      headers: {
        'content-type': 'application/json',
        bearer: Config.CHAT_TOKEN,
      },
      method: 'PUT',
    });
  }
}
