import reducer, { initialState } from '../activity-reducers';
import { messagesUpdated } from '../activity-actions';
import { servicesDestroyed } from 'pangea-common/serviceContainer-actions';

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
