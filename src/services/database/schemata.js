// @flow

import { schemata as schemaVZero, migration as migrationVZero } from './schema/v0';
import { schemata as schemaVOne, migration as migrationVOne } from './schema/v1';
import { schemata as schemaVTwo, migration as migrationVTwo } from './schema/v2';
import { schemata as schemaVThree, migration as migrationVThree } from './schema/v3';
import { schemata as schemaVFour, migration as migrationVFour } from './schema/v4';

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
];

export {
  DHTValueSchema,
  DHTValueType,

  AccountSchema,
  AccountType,

  AccountSettingsSchema,
  AccountSettingsType,

  AccountBalanceSchema,
  AccountBalanceType,

  MessageJobSchema,
  MessageJobType,

  NationSchema,
  NationType,

  TransactionJobSchema,
  TransactionJobType,

  AESValueSchema,
  AESType,

  PreKeyBundleSchema,
  PreKeyBundleType,

  ProfileSchema,
  ProfileType,

  SharedSecretSchema,
  SecretType,

  ChatSessionSchema,
  ChatSessionType,

  DAppMessageSchema,
  DAppMessageType,

  MessageSchema,
  MessageType,
  WalletSchema,
  WalletType,
  DAppSchema,
  DAppType,
  MessageKeySchema,
  DoubleRatchetKeySchema,
} from './schema/v4';
