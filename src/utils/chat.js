// @flow

import _ from 'lodash';
import { Buffer } from 'buffer/index';
import type { DAppMessageType, GiftedChatMessageType, PanthalassaMessage } from '../types/Chat';

/**
 * @desc Function that creates the list of messages to be consumed by GiftedChat
 * @param {Array<any>} messagesData Array of message data
 * @returns {Array<any>} An array of formatted messages data
 */
export default function deprecatedCreateGiftedChatMessageObject(messagesData: Array<any>): Array<any> {
  const messages = [];
  messagesData.forEach((data) => {
    messages.push({
      _id: data._id,
      text: data.msg,
      createdAt: data.createdAt,
      user: {
        _id: data.userId,
        name: data.from,
      },
    });
  });
  return messages;
}


/**
 * @desc Function to convert message to Gifted Chat representation
 * @param {PanthalassaMessage} message Message data coming from Panthalassa
 * @returns {GiftedChatMessageType} Converted message
 */
export function createGiftedChatMessageObject(message: PanthalassaMessage): GiftedChatMessageType {
  const createdAt = new Date(0);
  createdAt.setUTCMilliseconds(message.created_at / 1000000);
  let _id = -1;
  if (message.sender !== null) { // eslint-disable-line
    _id = Buffer.from(message.sender, 'base64').toString('hex');
  }
  const user = { _id };

  let dAppMessage: DAppMessageType | null = null;
  if (message.dapp !== '') {
    try {
      const dAppMessageJSON = JSON.parse(message.dapp);
      dAppMessage = {
        dAppPublicKey: Buffer.from(dAppMessageJSON.DAppPublicKey, 'base64').toString('hex'),
        params: dAppMessageJSON.Params,
        shouldSend: dAppMessageJSON.ShouldSend,
        type: dAppMessageJSON.Type,
      };
    } catch (error) {
      console.log(`[CHAT] Unable to parse DApp message: ${message.dapp}`);
    }
  }

  return {
    _id: message.db_id,
    text: message.content,
    createdAt,
    user,
    dAppMessage,
  };
}

/**
 * @desc Function to combine fetched older messages with existing ones
 * @param {GiftedChatMessageType[]} oldMessages Messages that is already stored on state.
 * @param {GiftedChatMessageType[]} comingMessages Messages that is fetched from storage.
 * @return {GiftedChatMessageType[]} Merged array of messages.
 */
export function mergeMessages(oldMessages: Array<GiftedChatMessageType>, comingMessages: Array<GiftedChatMessageType>): Array<GiftedChatMessageType> {
  const combined = [
    ...oldMessages,
    ...comingMessages,
  ];

  const sorted = _.sortBy(combined, message => message.createdAt);
  return _.uniqBy(sorted, message => message._id);
}
