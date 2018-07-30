import reducer, { initialState } from '../../../src/reducers/key';
import { storeVersion } from '../../../src/actions/migration';

describe('migration reducer action handling', () => {
  const version = '1.0.7';
  test('storeVersion', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, storeVersion(version));
    expect(stateAfter).toEqual({
      ...stateBefore,
      version,
    });
  });
});
