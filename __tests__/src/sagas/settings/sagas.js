// @flow

import { call, put, select } from 'redux-saga/effects';

import db, {
  factory as dbFactory,
  buildRandomPathDatabase,
} from '../../../../src/services/database';
import {
  buildAccountSettingsResults, loadSettings, onCurrentAccountChange, saveSettings,
  startDatabaseListening,
} from '../../../../src/sagas/settings/sagas';
import { settingsUpdated } from '../../../../src/actions/settings';
import { convertFromDatabase, convertToDatabase } from '../../../../src/utils/mapping/settings';
import { currentAccountBasedUpdate } from '../../../../src/sagas/accounts/sagas';

describe('onCurrentAccountChange', () => {
  test('empty results', () => {
    const gen = onCurrentAccountChange([]);
    expect(gen.next().done).toBeTruthy();
    expect(gen.next().value).toBeUndefined();
  });

  test('non-empty results', () => {
    const mockSettings = {
      id: 'test',
      passcodeType: 'pinCode',
      length: 6,
    };
    const convertedSettings = {
      id: 'test',
      passcodeType: {
        type: 'pinCode',
        length: 6,
      },
    };

    const gen = onCurrentAccountChange([mockSettings]);
    expect(gen.next().value).toEqual(call(convertFromDatabase, mockSettings));
    expect(gen.next(convertedSettings).value).toEqual(put(settingsUpdated(convertedSettings)));

    const last = gen.next();
    expect(last.done).toBeTruthy();
    expect(last.value).toBeUndefined();
  });
});

describe('buildAccountSettingsResults', () => {
  test('passing null to accountId', async () => {
    expect.assertions(1);
    const realm = await db;

    expect(buildAccountSettingsResults(realm, null)).toBeNull();
  });

  test('passing nonnull accountId', async () => {
    const realm = await db;

    expect(buildAccountSettingsResults(realm, 'test')).toBeDefined();
  });
});

test('startDatabaseListening', () => {
  const gen = startDatabaseListening();
  expect(gen.next().value).toEqual(call(currentAccountBasedUpdate, buildAccountSettingsResults, onCurrentAccountChange));

  const last = gen.next();
  expect(last.done).toBeTruthy();
  expect(last.value).toBeUndefined();
});

describe('loadSettings', () => {
  test('no settings', async () => {
    const mockAction = {
      type: 'LOAD_SETTINGS',
      accountId: 'TEST',
      callback: jest.fn(),
    };
    expect.assertions(4);

    const realm = await buildRandomPathDatabase();
    const gen = loadSettings(mockAction);
    expect(gen.next().value).toEqual(call(dbFactory));
    expect(gen.next(realm).value).toEqual(call(mockAction.callback, false));

    const last = gen.next();
    expect(last.done).toBeTruthy();
    expect(last.value).toBeUndefined();

    realm.close();
  });

  test('load correctly', async () => {
    const mockAction = {
      type: 'LOAD_SETTINGS',
      accountId: 'TEST',
      callback: jest.fn(),
    };
    const mockSettings1 = {
      id: 'TEST',
      passcodeType: 'password',
      pinCodeLength: null,
    };
    const mockSettings2 = {
      id: 'TEST2',
      passcodeType: 'pinCode',
      pinCodeLength: 6,
    };
    expect.assertions(5);

    const realm = await buildRandomPathDatabase();
    realm.write(() => {
      realm.create('AccountSettings', mockSettings1);
      realm.create('AccountSettings', mockSettings2);
    });
    const gen = loadSettings(mockAction);
    expect(gen.next().value).toEqual(call(dbFactory));
    expect(gen.next(realm).value).toEqual(put(settingsUpdated(convertFromDatabase(mockSettings1))));
    expect(gen.next().value).toEqual(call(mockAction.callback, true));

    const last = gen.next();
    expect(last.done).toBeTruthy();
    expect(last.value).toBeUndefined();

    realm.close();
  });
});

describe('saveSettings', () => {
  test('save correctly', async () => {
    const mockAction = {
      type: 'SAVE_SETTINGS',
      accountId: 'TEST',
      callback: jest.fn(),
    };
    const mockSettings = {
      passcodeType: {
        type: 'password',
      },
    };
    expect.assertions(7);

    const realm = await buildRandomPathDatabase();
    const gen = saveSettings(mockAction);
    expect(gen.next().value).toEqual(select());
    expect(gen.next({ settings: mockSettings }).value).toEqual(call(dbFactory));
    expect(gen.next(realm).value).toEqual(put(settingsUpdated(mockSettings)));
    expect(gen.next().value).toEqual(call(mockAction.callback, true));

    const last = gen.next();
    expect(last.done).toBeTruthy();
    expect(last.value).toBeUndefined();

    expect(realm.objects('AccountSettings').filtered(`id == '${mockAction.accountId}'`)[0])
      .toMatchObject(convertToDatabase(mockSettings, mockAction.accountId));

    realm.close();
  });
});
