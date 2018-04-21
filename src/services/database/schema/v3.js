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
export const Account = {
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
    DHT: {
      type: 'list',
      objectType: 'DHTValue',
    },
  },
};

/**
 * @typedef {Object} DHTValue
 * @property {string} key is the multihash (https://github.com/multiformats/multihash) key of the value
 * @property {ArrayBuffer} value
 * @property {ttl} should be a timestamp which represent till when the record should be available
 */
export const DHTValue = {
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

export const schemata = [
  Account,
  DHTValue,
];

export const migration = () => {

};
