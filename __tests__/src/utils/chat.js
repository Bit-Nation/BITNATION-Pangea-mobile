// @flow

import createGiftedChatMessageObject, { mergeMessages } from '../../../src/utils/chat';
import type { GiftedChatMessageType } from '../../../src/types/Chat';

test('createGiftedChatMessageObject', () => {
  const messageData = [
    {
      _id: 1,
      msg: 'hello',
      createdAt: '21-03-2018 18:38:34',
      userId: 4,
      from: 'mockUser',
    },
  ];
  const result = [
    {
      _id: messageData[0]._id,
      text: messageData[0].msg,
      createdAt: messageData[0].createdAt,
      user: {
        _id: messageData[0].userId,
        name: messageData[0].from,
      },
    },
  ];
  expect(createGiftedChatMessageObject(messageData)).toEqual(result);
});

describe('mergeMessages', () => {
  const buildMessage: ((id: string) => GiftedChatMessageType) = (id) => {
    return {
      _id: id,
      createdAt: new Date(),
      text: `${id}`,
      user: {
        _id: 'USER_ID',
        name: 'USER_NAME',
      },
      dAppMessage: null,
    };
  };

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
