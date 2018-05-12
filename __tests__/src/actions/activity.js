import {
  ADD_NEW_MESSAGE,
  DONE_FETCH_MESSAGES,
  MESSAGE_ADDED,
  START_FETCH_MESSAGES,
  addNewMessage,
  doneFetchMessages,
  messageAdded,
  startFetchMessages,
} from '../../../src/actions/activity';

describe('activity action creators', () => {
  const messageMock = {
    msg: 'Mock message',
    params: {},
    interpret: true,
  };
  const messagesMock = [{ ...messageMock }, { ...messageMock }];

  test('messageAdded', () => {
    expect(messageAdded([messageMock])).toEqual({
      type: MESSAGE_ADDED,
      messages: [messageMock],
    });
  });

  test('startFetchMessages', () => {
    expect(startFetchMessages(42)).toEqual({
      type: START_FETCH_MESSAGES,
      limit: 42,
    });
  });

  test('doneFetchMessages', () => {
    expect(doneFetchMessages(messagesMock)).toEqual({
      type: DONE_FETCH_MESSAGES,
      messages: messagesMock,
    });
  });

  test('addDummyMessage', () => {
    expect(addNewMessage('new message')).toEqual({
      type: ADD_NEW_MESSAGE,
      message: 'new message',
      params: {},
      interpret: true
    });
  });
});
