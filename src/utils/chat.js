// @flow

import _ from 'lodash';
import type { Account } from '../types/Account';
import type { ChatSessionType, GiftedChatMessageType, ProfileType } from '../types/Chat';

/**
 * @desc Function that creates the list of messages to be consumed by GiftedChat
 * @param {ProfileType} profile The profile of the recipient
 * @param {Array<any>} messagesData Array of message data
 * @returns {Array<GiftedChatMessageType>} An array of formatted messages data
 */
export default function createGiftedChatMessageObject(sender: Account, receiver: ProfileType, messagesData: Array<any>): Array<GiftedChatMessageType> {
  const messages = [];
  messagesData.forEach((data) => {
    let createdAt = new Date(0);
    createdAt.setUTCMilliseconds(data.created_at / 1000000);

    let user = data.received ?
      {_id: receiver.identity_pub_key, name: receiver.name} :
      {_id: sender.id, name: sender.name};

    messages.push({
      _id: data.db_id,
      text: data.content,
      createdAt,
      user,
    });
  });
  return messages;
}

export const getSelectedSession = (sessions: Array<ChatSessionType>, recipientPublicKey: string) =>
  _.find(sessions, session => session.publicKey === recipientPublicKey) || null;
