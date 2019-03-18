// @flow

import { createGiftedChatMessageObject, mergeMessages } from '../chat-utils';
import type { GiftedChatMessageType, PanthalassaMessage } from '../chat-types';

test('createGiftedChatMessageObject', () => {
  const messageData: PanthalassaMessage = {
    db_id: '1',
    content: 'hello',
    created_at: 1538166856784029150,
    sender: 'bq0UlEg/Se2+N3Jntal5oNYVrpFjWB6Brin4NlT3/C0=',
    dapp: '',
    received: true,
  };
  const result = {
    _id: '1',
    text: 'hello',
    createdAt: new Date('2018-09-28T20:34:16.784Z'),
    dAppMessage: null,
    user: {
      // Converted to hex
      _id: '6ead1494483f49edbe377267b5a979a0d615ae9163581e81ae29f83654f7fc2d',
    },
  };
  expect(createGiftedChatMessageObject(messageData)).toEqual(result);
});

describe('mergeMessages', () => {
  const buildMessage: ((id: string) => GiftedChatMessageType) = id => ({
    _id: id,
    createdAt: new Date(),
    text: `${id}`,
    user: {
      _id: 'USER_ID',
      name: 'USER_NAME',
    },
    dAppMessage: null,
  });

  test('empty merging', () => {
    expect(mergeMessages([], [])).toEqual([]);
  });
  test('merging empty with coming', () => {
    const comingMessages = [
      buildMessage('1'),
      buildMessage('2'),
      buildMessage('3'),
    ];

    expect(mergeMessages([], comingMessages)).toEqual(comingMessages);
  });
  test('merging when old is subset of coming', () => {
    const oldMessages = [
      buildMessage('1'),
      buildMessage('2'),
    ];
    const comingMessages = [
      oldMessages[0],
      oldMessages[1],
      buildMessage('3'),
    ];

    expect(mergeMessages(oldMessages, comingMessages)).toEqual(comingMessages);
  });
  test('merging when old intersects with coming', () => {
    const oldMessages = [
      buildMessage('1'),
      buildMessage('2'),
    ];
    const comingMessages = [
      oldMessages[1],
      buildMessage('3'),
    ];

    expect(mergeMessages(oldMessages, comingMessages)).toEqual([
      oldMessages[0],
      oldMessages[1],
      comingMessages[1],
    ]);
  });
});
