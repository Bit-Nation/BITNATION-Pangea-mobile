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
 * @typedef AESType
 * @property {string} iv
 * @property {number} cipher_text
 * @property {string} mac
 * @property {number} v Version of the AES
 */
export type AESType = {
  iv: string,
  cipher_text: string,
  mac: string,
  v: number,
};

export const AESValueSchema = {
  name: 'AESCipherText',
  properties: {
    iv: 'string',
    cipher_text: 'string',
    mac: 'string',
    v: 'int',
  },
};

/**
 * @typedef PreKeyBundleType
 * @property {string} one_time_pre_key
 * @property {AESType} private_part
 */
export type PreKeyBundleType = {
  one_time_pre_key: string,
  private_part: AESType,
};

export const PreKeyBundleSchema = {
  name: 'PreKeyBundle',
  properties: {
    one_time_pre_key: 'string',
    private_part: 'AESCipherText',
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
  identity_pub_key: string,
  ethereum_pub_Key: string,
  chat_id_key: string,
  timestamp: Date,
  version: number,
  identity_key_signature: string,
  ethereum_key_signature: string,
};

export const ProfileSchema = {
  name: 'Profile',
  primaryKey: 'identity_pub_key',
  properties: {
    name: 'string',
    location: 'string',
    image: 'string',
    identity_pub_key: 'string',
    ethereum_pub_Key: 'string',
    chat_id_key: 'string',
    timestamp: 'date',
    version: 'int',
    identity_key_signature: 'string',
    ethereum_key_signature: 'string',
  },
};

/**
 * @typedef SecretType
 * @property {string} id
 * @property {string} publicKey
 * @property {string} accountId
 * @property {AESType} secret
 */
export type SecretType = {
  id: string,
  publicKey: string,
  accountId: string,
  secret: AESType,
};

export const SharedSecretSchema = {
  name: 'SharedSecret',
  primaryKey: 'id',
  properties: {
    id: 'string',
    publicKey: 'string',
    accountId: 'string',
    secret: 'AESCipherText',
  },
};

/**
 * @typedef ChatSessionType
 * @property {string} secret
 * @property {string} publicKey
 * @property {string} username
 * @property {string} accountId
 * @property {Array<MessageType>} messages
 */
export type ChatSessionType = {
  secret: string,
  publicKey: string,
  username: string,
  accountId: string,
  messages: Array<MessageType>,
};

export const ChatSessionSchema = {
  name: 'ChatSession',
  primaryKey: 'secret',
  properties: {
    secret: 'string',
    publicKey: 'string',
    username: 'string',
    accountId: 'string',
    messages: {
      type: 'list',
      objectType: 'Message',
    },
  },
};

export const MessageKeySchema = {
  name: 'MessageKey',
  properties: {
    messageNumber: 'int',
    messageKey: 'string',
  },
};


export const DoubleRatchetKeySchema = {
  name: 'DoubleRatchetKey',
  primaryKey: 'doubleRatchetKey',
  properties: {
    accountId: 'string',
    doubleRatchetKey: 'string',
    messageKeys: {
      type: 'list',
      objectType: 'MessageKey',
    },
  },
};


/**
 * @typedef DAppType
 * @property {string} name Name of the DApp
 * @property {string} publicKey Public key of the DApp.
 * @property {string} signature Signature of the DApp.
 * @property {string} icon DApp icon in base64 format.
 * @property {string} code Source code of DApp.
 */
export type DAppType = {
  name: string,
  publicKey: string,
  signature: string,
  icon: string,
  code: string,
  accountId: string,
  compoundId: string,
}

export const DAppSchema = {
  name: 'DApp',
  primaryKey: 'compoundId',
  properties: {
    name: 'string',
    publicKey: 'string',
    signature: 'string',
    icon: {
      type: 'string',
      optional: true,
    },
    code: 'string',
    accountId: 'string',
    compoundId: 'string',
  },
};

/**
 * @typedef DAppMessageType
 * @property {string} dapp_id
 * @property {string} type
 * @property {string} group_id
 * @property {string} params
 * @property {boolean} should_send
 * @property {boolean} should_render
 */
export type DAppMessageType = {
  dapp_id: string,
  type: string,
  group_id: string,
  params: string,
  should_send: boolean,
  should_render: boolean,
};

export const DAppMessageSchema = {
  name: 'DAppMessage',
  properties: {
    dapp_id: 'string',
    type: 'string',
    group_id: 'string',
    params: 'string',
    should_send: 'bool',
    should_render: 'bool',
  },
};

/**
 * @typedef MessageType
 * @property {string} type
 * @property {Date} timestamp
 * @property {string} used_secret
 * @property {string} additional_data
 * @property {string} doubleratchet_message
 * @property {string} signature
 * @property {string} id_public_key
 * @property {string} receiver
 */
export type MessageType = {
  type: string,
  timestamp: Date,
  used_secret: string,
  additional_data: string,
  doubleratchet_message: string,
  signature: string,
  id_public_key: string,
  receiver: string,
};

export const MessageSchema = {
  name: 'Message',
  properties: {
    type: 'string',
    timestamp: 'date',
    used_secret: 'string',
    additional_data: 'string',
    doubleratchet_message: 'string',
    signature: 'string',
    id_public_key: 'string',
    receiver: 'string',
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
    AESValueSchema,
    AccountSettingsSchema,
    DHTValueSchema,
    AccountBalanceSchema,
    MessageJobSchema,
    TransactionJobSchema,
    NationSchema,
    PreKeyBundleSchema,
    ProfileSchema,
    SharedSecretSchema,
    ChatSessionSchema,
    DAppMessageSchema,
    MessageSchema,
    DAppSchema,
    MessageKeySchema,
    DoubleRatchetKeySchema,
    WalletSchema,
  ];

export const migration = () => {
  // @todo Migration
};
