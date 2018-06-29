// @flow

import _ from 'lodash';
import type { MessageType, GiftedChatMessageType, GiftedChatUserType } from '../types/Chat';

/**
 * @desc Function that creates the list of messages to be consumed by GiftedChat
 * @param {Array<any>} messagesData Array of message data
 * @returns {Array<any>} An array of formatted messages data
 */
export default function createGiftedChatMessageObject(messagesData: Array<any>): Array<any> {
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
 * @desc Convert message object into gifted chat format
 * @param {MessageType} messageData Message object from database
 * @param {number} id Message Id
 * @param {Object} profile User profile
 * @returns {GiftedChatMessageType} Message object
 */
export function convertFromDatabase(id: number, profile: Object, messageData: MessageType): GiftedChatMessageType {
  return {
    _id: id,
    text: messageData.human_message,
    createdAt: messageData.send_at,
    user: {
      _id: messageData.identity_pub_key,
      name: profile.name,
  };
}

export const getSelectedSession = (sessions: Array, secret: string) =>
  _.find(sessions, session => session.secret === secret) || null;
