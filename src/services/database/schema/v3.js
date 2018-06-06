/* eslint-disable no-use-before-define */
// @flow

export const AccountSchema = {
  name: 'Account',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    location: 'string',
    description: 'string',
    profileImage: 'string',
    accountStore: 'string',
    confirmedMnemonic: 'bool',
    networkType: 'string',
    DHT: {
      type: 'list',
      objectType: 'DHTValue',
    },
  },
};

/**
 * @typedef {Object} Account
 * @property {string} id in the uuid4 format
 * @property {string} name
 * @property {string} location
 * @property {string} description A profile description
 * @property {string} profileImage This should be a multihash (https://github.com/multiformats/multihash). It will be a reference to the image stored in the DHT.
 * @property {string} accountStore This string is the encrypted keystore that contain's all the private key's etc needed to work with this account
 * @property {Array<DHTValue>} DHT is the decentralized hash table of the account. It hold's data available to the public network. Like the profile image etc.
 */
export type AccountType = {
  id: string,
  name: string,
  location: string,
  description: string,
  profileImage: string,
  accountStore: string,
  confirmedMnemonic: boolean,
  networkType: 'main' | 'dev',
  DHT: Array<DHTValueType>
}

export const AccountSettingsSchema = {
  name: 'AccountSettings',
  primaryKey: 'id',
  properties: {
    id: 'string',
    passcodeType: 'string',
    pinCodeLength: {
      type: 'int',
      optional: true,
    },
  },
};

/**
 * @typedef {Object} AccountSettings
 * @property {string} id Id of account that settings are related to.
 * @property {string} passcodeType Selected type of passcode.
 * @property {string} networkType Selected type of network - either dev or main.
 */
export type AccountSettingsType = {
  id: string,
  passcodeType: 'pinCode' | 'password',
  pinCodeLength: number | null,
}

/**
 * @typedef AccountBalanceType
 * @property {string} id
 * @property {string} address
 * @property {string} amount
 * @property {number} synced_at
 * @property {string} currency
 */
export type AccountBalanceType = {
  id: string,
  address: string,
  // Amount is in wei
  amount: string,
  synced_at: number,
  currency: string
}

export const AccountBalanceSchema = {
  name: 'AccountBalance',
  primaryKey: 'id',
  properties: {
    id: 'string',
    address: 'string',
    amount: 'string',
    synced_at: 'date',
    currency: 'string',
  },
};

/**
 * @typedef {Object} DHTValue
 * @property {string} key is the multihash (https://github.com/multiformats/multihash) key of the value
 * @property {ArrayBuffer} value
 * @property {ttl} should be a timestamp which represent till when the record should be available
 */
export type DHTValueType = {
  key: string,
  value: ArrayBuffer,
  ttl: Date,
}

export const DHTValueSchema = {
  name: 'DHTValue',
  properties: {
    key: {
      type: 'string',
      unique: true,
    },
    value: 'data',
    ttl: 'date',
  },
};

/*
 * @typedef MessageJobType
 * @property {number} id
 * @property {string} heading
 * @property {string} text
 * @property {number} version
 * @property {date} created_at
 */
export type MessageJobType = {
  id: number,
  accountId: string,
  heading: string,
  params: string,
  msg: string,
  version: number,
  display: boolean,
  interpret: boolean,
  created_at: Date
}

export const MessageJobSchema = {
  name: 'MessageJob',
  primaryKey: 'id',
  properties: {
    id: 'int',
    accountId: 'string',
    heading: {
      type: 'string',
      optional: true,
    },
    interpret: 'bool',
    params: 'string',
    display: 'bool',
    msg: 'string',
    version: 'int',
    created_at: 'date',
  },
};

// We need this because of types circular dependencies.
/* eslint-disable no-use-before-define */

/**
 * @typedef TransactionJobType
 * @property {number} id
 * @property {string} txHash
 * @property {number} status
 * @property {string} type Can be something like NATION_JOIN, NATION_LEAVE, NATION_CREATE etc. Used to know what this transaction is about.
 */
export type TransactionJobType = {
  txHash: string,
  status: number,
  type: string,
  nation: NationType | null
}

/* eslint-enable no-use-before-define */

export const TransactionJobSchema = {
  name: 'TransactionJob',
  properties: {
    txHash: 'string',
    status: 'int',
    type: 'string',
    nation: {
      type: 'linkingObjects',
      objectType: 'Nation',
      property: 'tx',
    },
  },
};

/**
 * @typedef NationType
 * @property {number} id internal id of the dataset
 * @property {string} accountId Id of account that nation is related to.
 * @property {number} idInSmartContract is the id in the nation smart contract. If not this will be -1.
 * @property {boolean} created mean's if it is written to the blockchain (@todo this is probably an redundant field since you can get this information from "idInSmartContract")
 * @property {string} nationName human readable name of the nation
 * @property {string} nationDescription human readable description of the nation
 * @property {boolean} exists Does the nation already exists?
 * @property {boolean} virtualNation Is it a virtual nation?
 * @property {string} nationCode The nation code of law.
 * @property {string} lawEnforcementMechanism
 * @property {boolean} profit Is this nation a for profit use?
 * @property {boolean} nonCitizenUse Can non citizens use the services?
 * @property {boolean} diplomaticRecognition
 * @property {string} decisionMakingProcess
 * @property {string} governanceService
 * @property {number} citizens Number of citizens
 * @property {boolean} joined Did I join the nation?
 * @property {boolean} stateMutateAllowed Hold information about if we can mutate the state of this nation. Since we only support synchronous mutate of the nation state (join/leave nation).
 * @property {boolean} determinants if we should reset (set to true) the  stateMutateAllowed on the next indexing round.
 * @property {TransactionJobType | null} tx A transaction. It can be e.g. a transaction that is responsible for writing the nation to the blockchain.
 */
export type NationType = {
  id: number,
  accountId: string,
  idInSmartContract: number,
  created: boolean,
  nationName: string,
  nationDescription: string,
  exists: boolean,
  virtualNation: boolean,
  nationCode: string,
  lawEnforcementMechanism: string,
  profit: boolean,
  nonCitizenUse: boolean,
  diplomaticRecognition: boolean,
  decisionMakingProcess: string,
  governanceService: string,
  citizens: number,
  joined: boolean,
  stateMutateAllowed: boolean,
  resetStateMutateAllowed: boolean,
  tx: TransactionJobType | null
}

export const NationSchema = {
  name: 'Nation',
  primaryKey: 'id',
  properties: {
    accountId: 'string',
    id: 'int',
    idInSmartContract: {
      default: -1,
      type: 'int',
    },
    tx: {
      type: 'TransactionJob',
      optional: true,
    },
    created: 'bool',
    nationName: 'string',
    nationDescription: 'string',
    exists: 'bool',
    virtualNation: 'bool',
    nationCode: 'string',
    lawEnforcementMechanism: 'string',
    profit: 'bool',
    nonCitizenUse: 'bool',
    diplomaticRecognition: 'bool',
    decisionMakingProcess: 'string',
    governanceService: 'string',
    stateMutateAllowed: {
      type: 'bool',
      default: true,
    },
    resetStateMutateAllowed: {
      type: 'bool',
      default: false,
    },
    citizens: {
      type: 'int',
      default: 0,
    },
    joined: {
      type: 'bool',
      default: false,
    },
  },
};

export const schemata =
  [
    AccountSchema,
    AccountSettingsSchema,
    DHTValueSchema,
    AccountBalanceSchema,
    MessageJobSchema,
    TransactionJobSchema,
    NationSchema,
  ];

export const migration = () => {
  // @todo Migration
};
