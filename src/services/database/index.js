import schemas from './schemata';

const Realm = require('realm');

const REALM_PATH = 'pangea';

/**
 * @desc Creates an realm instance
 * @param {string} customDbPath optional path to the database
 * @return {Iterator} returns an iterator like every generator
 */
export default function* (customDbPath: string) {
  let databasePath = REALM_PATH;

  if (customDbPath !== '' && typeof customDbPath === 'string') {
    databasePath = customDbPath;
  }

  let nextSchemaIndex = Realm.schemaVersion(databasePath);

  while (nextSchemaIndex < schemas.length - 1) {
    nextSchemaIndex += 1;
    const schema = schemas[nextSchemaIndex];
    const migratedRealm = yield new Realm({
      path: databasePath,
      schema: schema.schema,
      schemaVersion: schema.schemaVersion,
      migration: schema.migration,
    });
    migratedRealm.close();
  }

  const schema = schemas[schemas.length - 1];
  yield Realm.open({
    path: databasePath,
    schema: schema.schema,
    schemaVersion: schema.schemaVersion,
    migration: schema.migration,
  });
}
