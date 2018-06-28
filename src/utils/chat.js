// @flow

import _ from 'lodash';

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

export const getSelectedSession = (sessions: Array, secret: string) =>
  _.find(sessions, session => session.secret === secret) || null;
