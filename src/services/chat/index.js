// @flow

import Config from 'react-native-config';
import { Buffer } from 'buffer/index';
import { createGiftedChatMessageObjects } from '../../utils/chat';
import type { Account } from '../../types/Account';
import type { ChatSessionType, GiftedChatMessageType, ProfileType } from '../../types/Chat';
import {
  panthalassaGetIdentityPublicKey,
  panthalassaAllChats,
  panthalassaMessages,
  panthalassaSendMessage,
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
        Identity: publicKey,
      },
      method: 'GET',
    })
      .then(response => response.text())
      .then(response => Profile.decode(Buffer.from(response, 'base64')))
      .then(response => Profile.toObject(response, { bytes: String }));
  }

  static async getPublicKey(): Promise<string> {
    return panthalassaGetIdentityPublicKey();
  }

  static async fetchAllChats(): Promise<Array<ChatSessionType>> {
    let response = await panthalassaAllChats();
    response = JSON.parse(response);
    return response;
  }

  static async loadMessages(sender: Account, receiver: ProfileType, startId: string, amount: number): Promise<Array<GiftedChatMessageType>> {
    let messages = [];
    try {
      messages = await panthalassaMessages(receiver.identityKey, startId, amount);
      messages = JSON.parse(messages);
      messages = createGiftedChatMessageObjects(sender, receiver, messages);
    } catch (e) {
      console.log(`[TEST] Error loading messages: ${e.message}`);
    }

    return messages;
  }

  static async sendMessage(recipientPublicKey: string, message: string): Promise<void> {
    try {
      await panthalassaSendMessage(recipientPublicKey, message);
    } catch (e) {
      console.log(`[TEST] Error sending messsage: ${e.message}`);
    }
  }
}
