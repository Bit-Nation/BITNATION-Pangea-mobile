// @flow

import { type Migration } from '../types/Migration';

type StartMigrationAction = { +type: 'START_MIGRATION' };

export type Action =
  | StartMigrationAction

export const START_MIGRATION = 'START_MIGRATION';

/**
 * @desc Action creator for an action that starts entered mnemonic validation process.
 * @returns {ValidateEnteredMnemonicAction} An action.
 */
export function startMigration(): StartMigrationAction {
  return {
    type: START_MIGRATION,
  };
}
