import Realm from 'realm';
import db, { factory } from '../../../../src/services/database/index';

const randomDbPath = () => `database/${Math.random()}`;

describe('db', () => {
  test('default path', async () => {
    const realm = await db;
    expect(realm.path.split('/').slice(-1)[0]).toEqual('pangea');
  });
  test('custom path', async () => {
    const id = Math.random();
    const databaseGenerator = factory(`database/${id}`);
    const realm = await databaseGenerator.next().value;

    // Last element of the realm path should be
    // "i_am_the_database_path" since we passed in a custom path
    expect(realm.path.split('/').slice(-1)[0]).toEqual(id.toString());
  });
  test('open and migrate process', async () => {
    const dbPath = randomDbPath();
    const databaseGenerator = factory(dbPath);

    // Opened with schema version 0
    const realm0 = await databaseGenerator.next().value;
    expect(Realm.schemaVersion(dbPath)).toBe(0);

    // Realm need to be passed in so that it can be closed
    const realm1 = await databaseGenerator.next(realm0).value;
    expect(Realm.schemaVersion(dbPath)).toBe(1);

    // Realm need to be passed in so that it can be closed
    const realm2 = await databaseGenerator.next(realm1).value;
    expect(Realm.schemaVersion(dbPath)).toBe(2);

    // The last yield will return the realm open promise
    await databaseGenerator.next(realm2).value;
    expect(Realm.schemaVersion(dbPath)).toBe(2);
  });
});
