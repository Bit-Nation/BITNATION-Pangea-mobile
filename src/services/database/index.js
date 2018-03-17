import schemas from './schemata';

const Realm = require('realm');
const co = require('co');

const REALM_PATH = 'pangea';

/**
 * @desc Creates an realm instance
 * @param {string} customDbPath optional path to the database
 * @return {Iterator} returns an iterator like every generator
 */
export function* factory(customDbPath: string) {
  let databasePath = REALM_PATH;

  if (customDbPath !== '' && typeof customDbPath === 'string') {
    databasePath = customDbPath;
  }

  let nextSchemaIndex = Realm.schemaVersion(databasePath);

  // We must use -1 since our schemas start by 0 and not by one.
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
  return yield new Promise((res, rej) => {
    Realm.open({
      path: databasePath,
      schema: schema.schema,
      schemaVersion: schema.schemaVersion,
      migration: schema.migration,
    }).then(res).catch(rej);
  });
}

export default co(factory);
