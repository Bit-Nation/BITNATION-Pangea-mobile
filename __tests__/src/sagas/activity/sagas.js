// @flow

import { put, call } from 'redux-saga/effects';

import defaultDB, { buildRandomPathDatabase } from '../../../../src/services/database';
import { buildMessagesResults, onCurrentAccountChange, addNewMessageSaga, startDatabaseListening, buildMessageObject } from '../../../../src/sagas/activity/sagas';
import { messagesAdded, ADD_NEW_MESSAGE } from '../../../../src/actions/activity';
import { convertFromDatabase, convertToDatabase } from '../../../../src/utils/mapping/activity';
import { getCurrentAccountId, currentAccountBasedUpdate } from '../../../../src/sagas/accounts/sagas';

describe('onCurrentAccountChange', () => {
  test('empty results', () => {
    const gen = onCurrentAccountChange([]);
    expect(gen.next().done).toBeTruthy();
    expect(gen.next().value).toBeUndefined();
  });

  test('non-empty results', () => {
    const mockMessage = {
      id: 123,
      accountId: 'test',
      heading: '',
      params: '',
      msg: 'dummy',
      version: 3,
      display: true,
      interpret: true,
      created_at: new Date(),
    };

    const gen = onCurrentAccountChange([mockMessage]);
    expect(gen.next().value).toEqual(put(messagesAdded([mockMessage].map(convertFromDatabase))));

    const last = gen.next();
    expect(last.done).toBeTruthy();
    expect(last.value).toBeUndefined();
  });
});

describe('buildMessagesResults', () => {
  test('passing null to accountId', async () => {
    const realm = await defaultDB;
    expect(buildMessagesResults(realm, null)).toBeNull();
  });

  test('passing nonnull accountId', async () => {
    const realm = await defaultDB;
    expect(buildMessagesResults(realm, 'test')).toBeDefined();
  });
});

test('startDatabaseListening', () => {
  const gen = startDatabaseListening();
  expect(gen.next().value).toEqual(call(currentAccountBasedUpdate, buildMessagesResults, onCurrentAccountChange));

  const last = gen.next();
  expect(last.done).toBeTruthy();
  expect(last.value).toBeUndefined();
});

describe('addNewMessageSaga', () => {
  test('save correctly', async () => {
    const mockAction = {
      type: ADD_NEW_MESSAGE,
      message: 'Test Message',
      params: '',
      interpret: true,
      callback: jest.fn(),
    };
    const testAccountId = 'Test Account';

    const realm = await buildRandomPathDatabase();
    const gen = addNewMessageSaga(mockAction);
    expect(gen.next().value).toEqual(defaultDB);
    expect(gen.next(realm).value).toEqual(call(getCurrentAccountId));
    expect(gen.next(testAccountId).value).toEqual(call(mockAction.callback, true));

    const last = gen.next();
    expect(last.done).toBeTruthy();
    expect(last.value).toBeUndefined();

    const mockMessage = buildMessageObject(1, testAccountId, mockAction.message, mockAction.params, mockAction.interpret);
    const convertedMessage = convertToDatabase(mockMessage);
    delete convertedMessage.created_at;
    delete convertedMessage.params;
    expect(realm.objects('MessageJob').filtered(`accountId == '${testAccountId}'`)[0])
      .toMatchObject({
        ...convertedMessage,
      });

    realm.close();
  });
});
