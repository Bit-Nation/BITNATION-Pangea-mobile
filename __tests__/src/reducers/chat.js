import reducer, { initialState } from '../../../src/reducers/chat';
import { hideSpinner, showSpinner } from '../../../src/actions/chat';

describe('chat reducer action handling', () => {
  test('default returns the same state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  test('initialState has fetching set to false', () => {
    expect(initialState.isFetching).toBeFalsy();
  });

  test('showSpinner', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, showSpinner());
    expect(stateAfter).toEqual({
      ...stateBefore,
      isFetching: true,
    });
  });

  test('hideSpinner', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, hideSpinner());
    expect(stateAfter).toEqual({
      ...stateBefore,
      isFetching: false,
    });
  });

  test('hideSpinner after showSpinner', () => {
    const stateBefore = initialState;
    const stateAfterShow = reducer(stateBefore, showSpinner());
    const stateAfter = reducer(stateAfterShow, hideSpinner());
    expect(stateAfter).toEqual({
      ...stateBefore,
      isFetching: false,
    });
  });
});
