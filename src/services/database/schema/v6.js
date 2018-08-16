/* eslint-disable no-use-before-define */
// @flow

import type { Realm } from 'realm';

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
    lastMigrationVersion: 'string',
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
 * @property {string} lastMigrationVersion This is the last migration version of the app
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
  lastMigrationVersion: string,
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

/**
 * @typedef TransactionJobType
 * @property {string} txHash
 * @property {number} status
 * @property {string} type Can be something like NATION_JOIN, NATION_LEAVE, NATION_CREATE etc. Used to know what this transaction is about.
 * @property {string} accountId Id of account that tx is related to
 */
export type TransactionJobType = {
  txHash: string,
  status: number,
  type: string,
  // It's an array since reversed relations are always arrays in Realm.
  nation: Array<NationType>,
  accountId: string,
}

export const TransactionJobSchema = {
  name: 'TransactionJob',
  primaryKey: 'txHash',
  properties: {
    txHash: 'string',
    status: 'int',
    type: 'string',
    nation: {
      type: 'linkingObjects',
      objectType: 'Nation',
      property: 'tx',
    },
    accountId: 'string',
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
 * @property {TransactionJobType | null} tx A transaction. It can be e.g. a transaction that is responsible for writing the nation to the blockchain.
 */
export type NationType = {
  id: string,
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
  tx: TransactionJobType | null
}

export const NationSchema = {
  name: 'Nation',
  primaryKey: 'id',
  properties: {
    accountId: 'string',
    id: 'string',
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

/**
 * @typedef ProfileType
 * @property {string} name
 * @property {string} location
 * @property {string} image
 * @property {string} identity_pub_key
 * @property {string} ethereum_pub_Key
 * @property {string} chat_id_key
 * @property {Date} timestamp
 * @property {number} version
 * @property {string} identity_key_signature
 * @property {string} ethereum_key_signature
 */
export type ProfileType = {
  name: string,
  location: string,
  image: string,
  identityKey: string,
  ethereumPublicKey: string,
  ethereumAddress: string,
  chatIdKey: string,
  timestamp: Date,
  version: number,
  identityKeySignature: string,
  ethereumKeySignature: string,
};

export const ProfileSchema = {
  name: 'Profile',
  primaryKey: 'identityKey',
  properties: {
    name: 'string',
    location: 'string',
    image: 'string',
    identityKey: 'string',
    ethereumPublicKey: 'string',
    ethereumAddress: 'string',
    chatIdKey: 'string',
    timestamp: 'date',
    version: 'int',
    identityKeySignature: 'string',
    ethereumKeySignature: 'string',
  },
};

/**
 * @typedef WalletType
 * @property {string} symbol Representation of the currency tokens.
 * @property {string} name Wallet's name.
 * @property {bool} ethereumBased True if token is based on Ethereum.
 * @property {number} decimals Number of decimals for the token.
 * @property {string} balance Wallet's balance.
 * @property {string} address Wallet's Public address.
 */
export type WalletType = {
  symbol: 'ETH' | 'PAT',
  name: string,
  chain: 'ethereum' | 'rootstock'| 'bitcoin',
  decimals: number,
  balance: string,
  address: string,
  accountId: string,
  compoundId: string,
}

export const WalletSchema = {
  name: 'Wallet',
  primaryKey: 'compoundId',
  properties: {
    name: 'string',
    symbol: 'string',
    chain: 'string',
    decimals: 'int',
    balance: 'string',
    address: 'string',
    accountId: 'string',
    compoundId: 'string',
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
    ProfileSchema,
    WalletSchema,
  ];

export const migration = (oldRealm: Realm, newRealm: Realm) => {
  // Migrate profiles
  // Since we remove all messages, it's not a problem if we remove profiles as well
  newRealm.delete(newRealm.objects('Profile'));
};
