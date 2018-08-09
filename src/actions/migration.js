// @flow

type StartMigrationAction = { +type: 'START_MIGRATION' };
type IsMigrationAction = { +type: 'IS_MIGRATION' };

export type Action =
  | StartMigrationAction
  | IsMigrationAction

export const START_MIGRATION = 'START_MIGRATION';
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
 * @desc Action creator for an action that is used to check if Migration is required or not
 * @return {IsMigrationAction} An action.
 */
export function isMigration(): IsMigrationAction {
  return {
    type: IS_MIGRATION,
  };
}
