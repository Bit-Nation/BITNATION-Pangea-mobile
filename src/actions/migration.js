// @flow

type StartMigrationAction = { +type: 'START_MIGRATION' };
type StoreVersionAction = { +type: 'STORE_VERSION' };
type isMigrationAction = { +type: 'IS_MIGRATION' };

export type Action =
  | StartMigrationAction
  | StoreVersionAction
  | isMigrationAction

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
 * @return {isMigrationAction} An action.
 */
export function isMigration(): isMigrationAction {
  return {
    type: IS_MIGRATION,
  };
}
