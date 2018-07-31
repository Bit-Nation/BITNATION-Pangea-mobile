// @flow

import { type Migration } from '../types/Migration';

type StartMigrationAction = { +type: 'START_MIGRATION' };
type StoreVersionAction = { +type: 'STORE_VERSION' };
type IsMigrationAction = { +type: 'IS_MIGRATION' };

export type Action =
  | StartMigrationAction
  | StoreVersionAction
  | IsMigrationAction

export const START_MIGRATION = 'START_MIGRATION';
export const STORE_VERSION = 'STORE_VERSION';
export const IS_MIGRATION = 'IS_MIGRATION';


/**
 * @desc Action creator for an action that starts the Migration process.
 * @returns {StartMigrationAction} An action.
 */
export function startMigration(): StartMigrationAction {
  return {
    type: START_MIGRATION,
  };
}

/**
 * @desc Action creator for an action that is used to store the version number
 * @param {string} version Version number of current app to be set.
 * @return {StoreVersionAction} An action.
 */
export function storeVersion(version: string): StoreVersionAction {
  return {
    type: STORE_VERSION,
    version,
  };
}

/**
 * @desc Action creator for an action that is used to check if Migration is required or not
 * @return {IsMigrationAction} An action.
 */
export function isMigration(): IsMigrationAction {
  return {
    type: IS_MIGRATION,
  };
}
