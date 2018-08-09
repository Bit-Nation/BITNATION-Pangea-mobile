// TODO Add Flow

import { NativeModules } from 'react-native';
import Config from 'react-native-config';
import defaultDB from '../database';
import { byteToHexString } from '../../utils/key';
import { Buffer } from 'buffer';
import type { ChatSessionType } from '../../types/Chat';
import {
  panthalassaGetIdentityPublicKey,
  panthalassaNewPreKeyBundle,
  panthalassaInitializeChat,
  panthalassaHandleInitialMessage,
  panthalassaCreateHumanMessage,
  panthalassaDecryptMessage,
  panthalassaAllChats,
  panthalassaMessages,
} from '../../services/panthalassa';

// Javascript static code of the proto file
import { api_proto as apiProto } from './compiled';
const { Profile } = apiProto;

export default class ChatService {
  static async uploadProfile(profile: string): Promise<any> {
    console.log(`[TEST] Profile upload: ${profile}`);
    const URL = `${Config.CHAT_ENDPOINT}/profile`;
    const result = await fetch(URL, {
      body: profile,
      headers: {
        'content-type': 'application/json',
        bearer: Config.CHAT_TOKEN,
      },
      method: 'PUT',
    });
    console.log(`[TEST] Profile upload result: ${JSON.stringify(result)}`);
    if (result.ok !== true) {
      return Promise.reject(new Error('Failed to upload profile'));
    }

    return Promise.resolve();
  }

  static async getProfile(publicKey: string): Promise<any> {
    const URL = `${Config.CHAT_ENDPOINT}/profile`;
    return fetch(URL, {
      headers: {
        'content-type': 'application/json',
        bearer: Config.CHAT_TOKEN,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
        'Identity': publicKey
      },
      method: 'GET',
    })
      .then(response => response.text())
      .then(response => Profile.decode(Buffer.from(response, 'base64')))
      .then(response => Profile.toObject(response, {bytes: String}));
  }

  static async getPublicKey(): Promise<any> {
    const publicKey = await panthalassaGetIdentityPublicKey();
    return publicKey;
  }

  static async getPreKeyBundleCount(): Promise<any> {
    const publicKey: string = ChatService.getPublicKey();
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
    let preKeyBundle = await panthalassaNewPreKeyBundle();
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

  static async fetchAllChats(): Array<ChatSessionType> {
    let response = await panthalassaAllChats();
    response = JSON.parse(response);
    return response;
  }

  static async startChat(identityPublicKey: string, preKeyBundle: string): Promise<any> {
    let response = await panthalassaInitializeChat(identityPublicKey, preKeyBundle);
    response = JSON.parse(response);
    await ChatService.uploadMessage(response.message);
    return response;
  }

  static async handleChatInit(message: string, preKeyBundlePrivatePart: string): Promise<any> {
    return panthalassaHandleInitialMessage(message, preKeyBundlePrivatePart);
  }

  static async createHumanMessage(rawMsg: string, secretID: string, secret: string, receiverIdKey: string): Promise<any> {
    let response = await panthalassaCreateHumanMessage(
      rawMsg, secretID, secret, receiverIdKey,
    );
    response = JSON.parse(response);
    await ChatService.uploadMessage(response);
    return response;
  }

  static async decryptMessage(message: string, secret: string): Promise<any> {
    return panthalassaDecryptMessage(message, secret);
  }

  static async uploadMessage(message: Object): Promise<any> {
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

  static async loadMessages(recipientPublicKey: string, start: Number, amount: Number): Array<any> {
    let response = [];
    try {
      const partner = Buffer.from(recipientPublicKey, 'utf8').toString('hex');
      response = await panthalassaMessages(partner, start, amount);
      response = JSON.parse(response);
    } catch(e) {
      console.log(`[TEST] Error loading messages: ${e.message}`);
    }

    return response;
  }
}
