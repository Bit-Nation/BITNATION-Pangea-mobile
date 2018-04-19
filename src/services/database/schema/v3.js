/**
 * @typedef {Object} Account
 * @property {string} id in the uuid4 format
 * @property {string} name
 * @property {string} location
 * @property {string} description A profile description
 * @property {string} profileImage This should be a multihash (https://github.com/multiformats/multihash). It will be a reference to the image stored in the DHT.
 * @property {string} accountStore This string is the encrypted keystore that contain's all the private key's etc needed to work with this account
 * @property {Array<DHTValue>} DHT is the decentralized hash table of the account. It hold's data available to the public network. Like the profile image etc.
 * @property {Array<Contact>} contacts
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
    DHT: {
      type: 'list',
      objectType: 'DHTValue',
    },
    contacts: {
      type: 'list',
      objectType: 'Contact',
    },
  },
};

/**
 * @typedef {Object} DHTValue
 * @property {string} key is the multihash (https://github.com/multiformats/multihash) key of the value
 * @property {ArrayBuffer} value
 */
export const DHTValue = {
  name: 'DHTValue',
  properties: {
    key: {
      type: 'string',
      unique: true,
    },
    value: 'data',
  },
};

/**
 *
 * @typedef {Object} Contact
 * @property {string} id in the uuid4 format
 * @property {string} identityPublicKey hex identity public key
 * @property {string} ethereumPublicKey hex ethereum public key
 * @property {string} name
 * @property {string} image multihash of the profile image
 */
export const Contact = {
  name: 'Contact',
  primaryKey: 'id',
  properties: {
    id: 'string',
    identityPublicKey: 'string',
    ethereumPublicKey: 'string',
    name: 'string',
    image: 'string',
  },
};

export const schemata = [
  Account,
  Contact,
  DHTValue,
];

export const migration = () => {

};
