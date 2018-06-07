import {
  ADD_NEW_MESSAGE,
  MESSAGES_UPDATED,
  emptyCallback,
  addNewMessage,
  messagesUpdated,
} from '../../../src/actions/activity';

describe('activity action creators', () => {
  const messageMock = {
    msg: 'Mock message',
    params: {},
    interpret: true,
  };

  test('messagesUpdated', () => {
    expect(messagesUpdated([messageMock])).toEqual({
      type: MESSAGES_UPDATED,
      messages: [messageMock],
    });
  });

  test('addDummyMessage', () => {
    expect(addNewMessage('new message')).toEqual({
      type: ADD_NEW_MESSAGE,
      message: 'new message',
      params: {},
      interpret: true,
      callback: emptyCallback,
    });
  });
});
