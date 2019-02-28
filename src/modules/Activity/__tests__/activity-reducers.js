import reducer, { initialState } from '../../../src/reducers/activity';
import { messagesUpdated } from '../../../src/actions/activity';
import { servicesDestroyed } from '../../../src/actions/serviceContainer';

const message = {
  id: 0,
  msg: 'Test message 0',
  interpret: true,
};

describe('activity reducer action handling', () => {
  test('default returns the same state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  test('after service destroy returns initial state', () => {
    const changedState = reducer(initialState, messagesUpdated([message]));
    expect(reducer(changedState, servicesDestroyed())).toEqual(initialState);
  });

  test('messagesUpdated after initial state', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, messagesUpdated([message]));
    expect(stateAfter).toEqual({
      ...stateBefore,
      messages: [message],
    });
  });
});
