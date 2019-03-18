import {
  START_MIGRATION,
  IS_MIGRATION,
  startMigration,
  isMigration,
} from '../migration-actions.js';

describe('migration action creators', () => {
  test('startMigration', () => {
    expect(startMigration()).toEqual({
      type: START_MIGRATION,
    });
  });

  test('isMigration', () => {
    expect(isMigration()).toEqual({
      type: IS_MIGRATION,
    });
  });
});
