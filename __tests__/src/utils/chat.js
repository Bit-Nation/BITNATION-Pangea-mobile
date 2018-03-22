import createGiftedChatMessageObject from '../../../src/utils/chat';

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
