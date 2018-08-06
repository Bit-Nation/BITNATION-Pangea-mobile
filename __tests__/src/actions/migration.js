import {
  START_MIGRATION,
  IS_MIGRATION,
  startMigration,
  storeVersion,
  isMigration,
  STORE_VERSION,
} from '../../../src/actions/migration';

describe('migration action creators', () => {
  test('startMigration', () => {
    expect(startMigration()).toEqual({
      type: START_MIGRATION,
    });
  });

  test('storeVersion', () => {
    const version = '1.0.7';
    expect(storeVersion(version)).toEqual({
      type: STORE_VERSION,
      version,
    });
  });

  test('isMigration', () => {
    expect(isMigration()).toEqual({
      type: IS_MIGRATION,
    });
  });
});
