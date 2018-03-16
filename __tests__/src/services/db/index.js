import { dbFactory } from '../../../../src/services/db';

const dbPathFactory = () => `/tmp/pangea_testing_db_${Math.random()}`;

describe('database - index', () => {
  test('test database factory', (done) => {
    // Create database
    dbFactory(dbPathFactory())
      .then((realm) => {
        // Make sure that no dataset exist
        expect(realm.objects('TransactionJob')).toHaveLength(0);
        // Write a test database to realm
        realm.write(() => {
          realm.create('TransactionJob', {
            txHash: 'abc',
            status: 200,
            type: 'NATION_CREATE',
          });
        });
        // Make sure that the object was written to the database
        expect(realm.objects('TransactionJob')).toHaveLength(1);
        done();
      })
      .catch(done.fail);
  });
});
