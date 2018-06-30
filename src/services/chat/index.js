// @flow

import { NativeModules } from 'react-native';
import Config from 'react-native-config';
// import type { Profile } from '../../types/Account';
import defaultDB from '../database';
import { byteToHexString } from '../../utils/key';


const { Panthalassa } = NativeModules;

export default class ChatService {
  static async uploadProfile(profile: string): Promise<any> {
    console.log('profile upload: ', JSON.parse(profile));
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
    if (bundleCountResponse.count < 100) {
      return ChatService.uploadPreKeyBundle();
    }
    return Promise.resolve({
      result: 'success',
    });
  }

  static async getProfile(publicKey: string): Promise<any> {
    const URL = `${Config.CHAT_ENDPOINT}/profile/${publicKey}`;
    return fetch(URL, {
      headers: {
        'content-type': 'application/json',
        bearer: Config.CHAT_TOKEN,
      },
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => JSON.parse(response.profile));
  }

  static async getPublicKey(): Promise<string> {
    const publicKey = await Panthalassa.PanthalassaIdentityPublicKey();
    return publicKey;
  }

  static async getPreKeyBundleCount(): Promise<number> {
    const publicKey = ChatService.getPublicKey();
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

  static async getPreKeyBundle(publicKey: string): Promise<any> {
    const URL = `${Config.CHAT_ENDPOINT}/pre-key-bundle/${publicKey}`;
    return fetch(URL, {
      headers: {
        'content-type': 'application/json',
        bearer: Config.CHAT_TOKEN,
      },
      method: 'GET',
    })
      .then(response => response.json());
  }

  static async uploadPreKeyBundle(): Promise<any> {
    let preKeyBundle = await Panthalassa.PanthalassaNewPreKeyBundle();
    preKeyBundle = JSON.parse(preKeyBundle);
    console.log('pre key bundle: ', preKeyBundle);

    const db = await defaultDB;
    const dbPreKey = {
      one_time_pre_key: byteToHexString(preKeyBundle.public_part.one_time_pre_key),
      private_part: preKeyBundle.private_part,
    };
    db.write(() => {
      db.create('PreKeyBundle', dbPreKey, true);
    });

    const URL = `${Config.CHAT_ENDPOINT}/pre-key-bundle`;
    return fetch(URL, {
      body: JSON.stringify(preKeyBundle.public_part),
      headers: {
        'content-type': 'application/json',
        bearer: Config.CHAT_TOKEN,
      },
      method: 'PUT',
    });
  }

  static async startChat(identityPublicKey: string, preKeyBundle: string): Promise<any> {
    let response = await Panthalassa.PanthalassaInitializeChat({ identityPublicKey, preKeyBundle });
    response = JSON.parse(response);
    await ChatService.uploadMessage(response.message);
    return response;
  }
  static async handleChatInit(message: string, preKeyBundlePrivatePart: string): Promise<any> {
    return Panthalassa.PanthalassaHandleInitialMessage({ message, preKeyBundlePrivatePart });
  }

  static async createHumanMessage(rawMsg: string, secretID: string, secret: string, receiverIdKey: string): Promise<any> {
    let response = await Panthalassa.PanthalassaCreateHumanMessage({
      rawMsg, secretID, secret, receiverIdKey,
    });
    response = JSON.parse(response);
    await ChatService.uploadMessage(response);
    return response;
  }

  static async decryptMessage(message: string, secret: string): Promise {
    return Panthalassa.PanthalassaDecryptMessage({ message, secret });
  }

  static async uploadMessage(message: Object): Promise {
    console.log('upload message: ', message);
    const URL = `${Config.CHAT_ENDPOINT}/message`;
    return fetch(URL, {
      body: JSON.stringify(message),
      headers: {
        'content-type': 'application/json',
        bearer: Config.CHAT_TOKEN,
      },
      method: 'PUT',
    });
  }

  static async loadMessages(publicKey: string): Promise<any> {
    const URL = `${Config.CHAT_ENDPOINT}/missing-messages/${publicKey}`;
    return fetch(URL, {
      headers: {
        'content-type': 'application/json',
        bearer: Config.CHAT_TOKEN,
      },
      method: 'GET',
    })
      .then(response => response.json());
  }
}
