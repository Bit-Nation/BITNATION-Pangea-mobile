import {
  ADD_DUMMY_MESSAGE,
  DONE_FETCH_MESSAGES,
  MESSAGE_ADDED,
  START_FETCH_MESSAGES,
  addDummyMessage,
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
    expect(messageAdded(messageMock)).toEqual({
      type: MESSAGE_ADDED,
      message: messageMock,
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
    expect(addDummyMessage()).toEqual({
      type: ADD_DUMMY_MESSAGE,
    });
  });
});
