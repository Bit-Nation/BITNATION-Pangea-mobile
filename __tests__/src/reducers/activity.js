import reducer, {
  initialState,
  mergeMessages,
} from '../../../src/reducers/activity';
import { doneFetchMessages, messageAdded, startFetchMessages } from '../../../src/actions/activity';

const message0 = {
  id: 0,
  msg: 'Test message 0',
  interpret: true,
};
const message1 = {
  id: 1,
  msg: 'Test message 1',
  interpret: false,
};
const message2 = {
  id: 2,
  msg: 'Test message 2',
  interpret: true,
};

describe('mergeMessages', () => {
  test('full merging', () => {
    expect(mergeMessages([message0, message1], [message2], 3))
      .toEqual([message2, message1, message0]);
    expect(mergeMessages([message2, message1], [message1, message0, message2], 10))
      .toEqual([message2, message1, message0]);
    expect(mergeMessages([message2, message0], [message2, message1], 5))
      .toEqual([message2, message1, message0]);
  });

  test('merging with limit', () => {
    expect(mergeMessages([message0, message1], [message2], 2))
      .toEqual([message2, message1]);
    expect(mergeMessages([message1, message0], [message2, message0], 1))
      .toEqual([message2]);
    expect(mergeMessages([message2, message0, message1], [message2, message0], 2))
      .toEqual([message2, message1]);
  });
});

describe('activity reducer action handling', () => {
  test('default returns the same state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  test('messageAdded after initial state', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, messageAdded(message0));
    expect(stateAfter).toEqual({
      ...stateBefore,
      messages: [message0],
    });
  });

  test('startFetchMessages', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, startFetchMessages());
    expect(stateAfter).toEqual({
      ...stateBefore,
      isFetching: true,
    });
  });

  test('doneFetchMessages', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, doneFetchMessages([message0, message1, message2]));
    expect(stateAfter).toEqual({
      ...stateBefore,
      messages: [message2, message1, message0],
      isFetching: false,
    });
  });

  test('messageAdded after some messages initially added', () => {
    const stateBefore = initialState;
    const stateAfterFetch = reducer(stateBefore, doneFetchMessages([message0, message1]));
    const stateAfter = reducer(stateAfterFetch, messageAdded(message2));
    expect(stateAfter).toEqual({
      ...stateBefore,
      messages: [message2, message1, message0],
    });
  });
});
