// @flow

import Realm from 'realm';
import co from 'co';
import schemas from './schemata';

// We keep previous database to be able later do some restore.
const REALM_PATH_BEFORE_0_4_5 = 'pangea';
const REALM_PATH = 'pangea_0_4_5';

/**
 * @desc Creates an realm instance
 * @param {string} customDbPath optional path to the database
 * @return {Iterator} returns an iterator like every generator
 */
export function* factory(customDbPath: ?string): Generator<*, *, *> {
  let databasePath = REALM_PATH;

  if (customDbPath !== '' && typeof customDbPath === 'string') {
    databasePath = customDbPath;
  }

  let nextSchemaIndex = Realm.schemaVersion(databasePath);

  // We must use -1 since our schemas start by 0 and not by one.
  while (nextSchemaIndex < schemas.length - 1) {
    nextSchemaIndex += 1;
    const schema = schemas[nextSchemaIndex];
    const migratedRealm = yield Realm.open({
      path: databasePath,
      schema: schema.schema,
      schemaVersion: schema.schemaVersion,
      migration: schema.migration,
    });
    migratedRealm.close();
  }

  const schema = schemas[schemas.length - 1];
  return yield Realm.open({
    path: databasePath,
    schema: schema.schema,
    schemaVersion: schema.schemaVersion,
    migration: schema.migration,
  });
}

export const buildRandomPathDatabase = () => co(factory(`database/${Math.random()}`));

export default co(factory);
