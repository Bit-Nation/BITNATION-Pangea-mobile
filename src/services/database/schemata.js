// @flow

const schemaVZero = require('./schema/v0');
const schemaVOne = require('./schema/v1');
const schemaVTwo = require('./schema/v2');

/**
 * @desc All available schemas. including there version and migration.
 */
export default [
  {
    schema: schemaVZero.schemata,
    schemaVersion: 0,
    migration: schemaVZero.migration,
  },
  {
    schema: schemaVOne.schemata,
    schemaVersion: 1,
    migration: schemaVOne.migration,
  },
  {
    schema: schemaVTwo.schemata,
    schemaVersion: 2,
    migration: schemaVTwo.migration,
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
