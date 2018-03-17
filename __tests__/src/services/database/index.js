import db from '../../../../src/services/database/index';

const randomDbPath = () => `database/${Math.random()}`;
const Realm = require('realm');

describe('db', () => {
  test('default path', () => {
    const databaseGenerator = db();

    const realmInstance = databaseGenerator.next().value;

    // Last element of the realm path should be "pangea"
    // since we didn't pass in another path to the db generator
    expect(realmInstance.path.split('/').slice(-1)[0]).toEqual('pangea');
  });
  test('custom path', () => {
    const databaseGenerator = db('database/i_am_the_database_path');

    const realmInstance = databaseGenerator.next().value;

    // Last element of the realm path should be
    // "i_am_the_database_path" since we passed in a custom path
    expect(realmInstance.path.split('/').slice(-1)[0]).toEqual('i_am_the_database_path');
  });
  test('open and migrate process', () => {
    const dbPath = randomDbPath();
    const databaseGenerator = db(dbPath);

    // Opened with schema version 0
    const realm0 = databaseGenerator.next().value;
    expect(Realm.schemaVersion(dbPath)).toBe(0);

    // Realm need to be passed in so that it can be closed
    const realm1 = databaseGenerator.next(realm0).value;
    expect(Realm.schemaVersion(dbPath)).toBe(1);
    // Realm need to be passed in so that it can be closed
    databaseGenerator.next(realm1);
    expect(Realm.schemaVersion(dbPath)).toBe(2);
  });
});
