import { put, call } from 'redux-saga/effects';
import type { Realm } from 'realm';

import { SaveProfileAction, SavePreKeyBundleAction } from '../../actions/chat';
import defaultDB from '../../services/database';
import { getCurrentAccountId } from '../accounts/sagas';

/**
 * @desc Save a user profile into the database
 * @param {SaveProfileAction} action SAVE_PROFILE action
 * @return {void}
 */
export function* saveProfile(action: SaveProfileAction) {
  const db = yield defaultDB;
}

/**
 * @desc Save a user profile into the database
 * @param {SaveProfileAction} action SAVE_PROFILE action
 * @return {void}
 */
export function* savePreKeyBundle(action: SavePreKeyBundleAction) {
  const db = yield defaultDB;
}
