import reducer, { initialState } from '../../../src/reducers/migration';
import { storeVersion } from '../../../src/actions/migration';

describe('migration reducer action handling', () => {
  const migrationVersion = '1.0.7';
  test('storeVersion', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, storeVersion(migrationVersion));
    expect(stateAfter).toEqual({
      ...stateBefore,
      migrationVersion,
    });
  });
});
