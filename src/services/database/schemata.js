// @flow

import { schemata as schemaVZero, migration as migrationVZero } from './schema/v0';
import { schemata as schemaVOne, migration as migrationVOne } from './schema/v1';
import { schemata as schemaVTwo, migration as migrationVTwo } from './schema/v2';

/**
 * @desc All available schemas. including there version and migration.
 */
export default [
  {
    schema: schemaVZero,
    schemaVersion: 0,
    migration: migrationVZero,
  },
  {
    schema: schemaVOne,
    schemaVersion: 1,
    migration: migrationVOne,
  },
  {
    schema: schemaVTwo,
    schemaVersion: 2,
    migration: migrationVTwo,
  },
];

export {
  AccountBalanceSchema,
  AccountBalanceType,

  MessageJobSchema,
  MessageJobType,

  NationSchema,
  NationType,

  ProfileSchema,
  ProfileType,

  TransactionJobSchema,
  TransactionJobType,
} from './schema/v2';
