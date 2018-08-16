// @flow

import { schemata as schemaVZero, migration as migrationVZero } from './schema/v0';
import { schemata as schemaVOne, migration as migrationVOne } from './schema/v1';
import { schemata as schemaVTwo, migration as migrationVTwo } from './schema/v2';
import { schemata as schemaVThree, migration as migrationVThree } from './schema/v3';
import { schemata as schemaVFour, migration as migrationVFour } from './schema/v4';
import { schemata as schemaVFive, migration as migrationVFive } from './schema/v5';
import { schemata as schemaVSix, migration as migrationVSix } from './schema/v6';

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
  {
    schema: schemaVThree,
    schemaVersion: 3,
    migration: migrationVThree,
  },
  {
    schema: schemaVFour,
    schemaVersion: 4,
    migration: migrationVFour,
  },
  {
    schema: schemaVFive,
    schemaVersion: 5,
    migration: migrationVFive,
  },
  {
    schema: schemaVSix,
    schemaVersion: 6,
    migration: migrationVSix,
  },
];

export {
  DHTValueSchema,
  DHTValueType,

  AccountSchema,
  AccountType,

  AccountSettingsSchema,
  AccountSettingsType,

  MessageJobSchema,
  MessageJobType,

  NationSchema,
  NationType,

  TransactionJobSchema,
  TransactionJobType,

  ProfileSchema,
  ProfileType,

  WalletSchema,
  WalletType,
} from './schema/v6';
