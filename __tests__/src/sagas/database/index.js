// @flow

import { END } from 'redux-saga';

import { buildRandomPathDatabase } from '../../../../src/services/database';
import { createDatabaseUpdateChannel } from '../../../../src/sagas/database';

test('createDatabaseUpdateChannel', async () => {
  expect.assertions(7);

  const realm = await buildRandomPathDatabase();
  let settings;
  realm.write(() => {
    settings = realm.create('AccountSettings', { id: 'TEST', passcodeType: 'password' });
  });
  const results = realm.objects('AccountSettings').filtered('id = "TEST"');
  const channel = createDatabaseUpdateChannel(results);

  const channelTake = () => new Promise((resolve) => {
    channel.take((update) => {
      resolve(update);
    });
  });

  const resultBefore = await channelTake();

  expect(resultBefore.collection).toHaveLength(1);
  expect(resultBefore.collection[0]).toMatchObject({ id: 'TEST', passcodeType: 'password' });
  expect(resultBefore.changes).toEqual({
    deletions: [],
    insertions: [],
    modifications: [],
  });

  realm.write(() => {
    settings.passcodeType = 'pinCode';
    settings.pinCodeLength = 6;
  });

  const resultAfter = await channelTake();
  expect(resultAfter.collection).toHaveLength(1);
  expect(resultAfter.collection[0]).toMatchObject({ id: 'TEST', passcodeType: 'pinCode', pinCodeLength: 6 });
  expect(resultAfter.changes).toEqual({
    deletions: [],
    insertions: [],
    modifications: [0],
  });

  channel.close();

  const resultAfterClose = await channelTake();
  expect(resultAfterClose).toBe(END);
});
