import Realm from 'realm';
import db, { factory, buildRandomPathDatabase } from '../../../../src/services/database';

const randomDbPath = () => `database/${Math.random()}`;

describe('db', () => {
  test('default path', async () => {
    expect.assertions(1);
    const realm = await db;
    expect(realm.path.split('/').slice(-1)[0]).toEqual('pangea_0_4_5');
    realm.close();
  });
  test('custom path', async () => {
    expect.assertions(1);
    const id = Math.random();
    const databaseGenerator = factory(`database/${id}`);
    const realm = await databaseGenerator.next().value;

    // Last element of the realm path should be
    // "i_am_the_database_path" since we passed in a custom path
    expect(realm.path.split('/').slice(-1)[0]).toEqual(id.toString());
    realm.close();
  });
  describe('open and migrate process', () => {
    test('schema v0 - v2', async () => {
      expect.assertions(3);
      const dbPath = randomDbPath();
      const databaseGenerator = factory(dbPath);

      // Opened with schema version 0
      const realm0 = await databaseGenerator.next().value;
      expect(Realm.schemaVersion(dbPath)).toBe(0);

      // Realm need to be passed in so that it can be closed
      const realm1 = await databaseGenerator.next(realm0).value;
      expect(Realm.schemaVersion(dbPath)).toBe(1);

      // The last yield will return the realm open promise
      const realm2 = await databaseGenerator.next(realm1).value;
      expect(Realm.schemaVersion(dbPath)).toBe(2);

      realm2.close();
    });

    test('schema v3 - v6', async () => {
      expect.assertions(5);
      const dbPath = randomDbPath();
      const databaseGenerator = factory(dbPath, 3);

      const realm3: Realm = await databaseGenerator.next().value;
      expect(Realm.schemaVersion(dbPath)).toBe(3);

      const realm4: Realm = await databaseGenerator.next(realm3).value;
      expect(Realm.schemaVersion(dbPath)).toBe(4);

      const realm5: Realm = await databaseGenerator.next(realm4).value;
      expect(Realm.schemaVersion(dbPath)).toBe(5);

      // Add profile to DB
      realm5.write(() => {
        realm5.create('Profile', {
          name: 'name',
          location: 'location',
          image: 'image',
          identity_pub_key: 'identity_pub_key',
          ethereum_pub_Key: 'ethereum_pub_Key',
          chat_id_key: 'chat_id_key',
          timestamp: new Date(),
          version: 0,
          identity_key_signature: 'identity_key_signature',
          ethereum_key_signature: 'ethereum_key_signature',
        });
      });

      const realm6: Realm = await databaseGenerator.next(realm5).value;
      expect(Realm.schemaVersion(dbPath)).toBe(6);

      // Check that profile was deleted correctly.
      expect(realm6.objects('Profile')).toHaveLength(0);

      realm6.close();
    });
  });
  test('random path database builder', async () => {
    expect.assertions(2);
    const realm = await buildRandomPathDatabase();
    expect(realm.write).toBeDefined();
    expect(realm.objects).toBeDefined();
    realm.close();
  });
});
