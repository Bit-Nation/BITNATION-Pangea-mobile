import {
  ADD_NEW_MESSAGE,
  MESSAGES_ADDED,
  emptyCallback,
  addNewMessage,
  messagesAdded,
} from '../../../src/actions/activity';

describe('activity action creators', () => {
  const messageMock = {
    msg: 'Mock message',
    params: {},
    interpret: true,
  };

  test('messagesAdded', () => {
    expect(messagesAdded([messageMock])).toEqual({
      type: MESSAGES_ADDED,
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
