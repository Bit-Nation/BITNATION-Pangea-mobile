// @flow

/* eslint-disable no-use-before-define */
import { call, put, select } from 'redux-saga/effects';
import type { Realm } from 'realm';
import defaultDB from '@pangea/database';
import { currentAccountBasedUpdate } from '@pangea/accounts/accounts-sagas/sagas';
import type { AccountSettingsType as DBSettings } from '@pangea/database/schemata';
import { settingsUpdated } from '@pangea/settings/settings-actions';
import { convertFromDatabase, convertToDatabase } from '@pangea/settings/settings-utils';
import type { LoadSettings, SaveSettings } from '@pangea/settings/settings-actions';
import type { SettingsType } from '@pangea/settings/Settings-types';

/**
 * @desc Generator to be called on database change. Used to update settings.
 * @param {*} collection Updated settings collection
 * @return {void}
 */
export function* onCurrentAccountChange(collection: Realm.Collection<DBSettings>): Generator<*, *, *> {
  if (collection.length === 0) {
    return;
  }

  const settings = collection[0];
  const convertedSettings = yield call(convertFromDatabase, settings);
  yield put(settingsUpdated(convertedSettings));
}

/**
 * @desc Function that creates Realm results fetching settings for specific account.
 * @param {Realm} db Realm instance.
 * @param {string|null} accountId Id of account to fetch settings or null.
 * @return {Realm.Results<AccountSettings>|null} Realm results fetching settings for specified account or null if not applicable.
 */
export function buildAccountSettingsResults(db: Realm, accountId: string | null) {
  if (accountId === null) {
    return null;
  }
  return db.objects('AccountSettings').filtered(`id == '${accountId}'`);
}

/**
 * @desc Starts listen to settings updates in database.
 * @return {void}
 */
export function* startDatabaseListening(): Generator<*, *, *> {
  yield call(currentAccountBasedUpdate, buildAccountSettingsResults, onCurrentAccountChange);
}

/**
 * @desc Loads settings for specific account.
 * @param {LoadSettings} action An action.
 * @return {void}
 */
export function* loadSettings(action: LoadSettings): Generator<*, *, *> {
  const db: Realm = yield defaultDB;
  const objects = db.objects('AccountSettings').filtered(`id == '${action.accountId}'`);
  if (objects.length === 0) {
    yield call(action.callback, false);
    return;
  }
  const settings: DBSettings = objects[0];

  yield put(settingsUpdated(convertFromDatabase(settings)));
  yield call(action.callback, true);
}

/**
 * @desc Saves settings for specific account.
 * @param {SaveSettings} action An action.
 * @return {void}
 */
export function* saveSettings(action: SaveSettings): Generator<*, *, *> {
  const { settings }: { settings : SettingsType } = yield select();
  const db: Realm = yield defaultDB;
  let dbSettings: ?DBSettings = null;
  db.write(() => {
    dbSettings = db.create('AccountSettings', convertToDatabase(settings, action.accountId), true);
  });

  if (dbSettings == null) {
    yield call(action.callback, false);
    return;
  }

  yield put(settingsUpdated(convertFromDatabase(dbSettings)));
  yield call(action.callback, true);
}
