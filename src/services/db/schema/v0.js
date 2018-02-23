// @flow
// Schema v0: Effective from app beginning to 0.3.1 

/**
 * @typedef ProfileType
 * @property {number} id
 * @property {string} pseudo
 * @property {string} description
 * @property {string} image
 * @property {string} version
 */
export type ProfileType = {
    id: number,
    name: string,
    location: string,
    latitude: string,
    longitude: string,
    description: string,
    image: string,
    version: string
}

export const ProfileSchema = {
    name: 'Profile',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        location: 'string',
        latitude: 'string',
        longitude: 'string',
        description: 'string',
        image: 'string',
        version: 'string',
    },
};

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
 * @typedef MessageJobType
 * @property {number} id
 * @property {string} heading
 * @property {string} text
 * @property {number} version
 * @property {date} created_at
 */
export type MessageJobType = {
    id: number,
    heading: string,
    text: string,
    version: number,
    created_at: Date
}

export const MessageJobSchema = {
    name: 'MessageJob',
    primaryKey: 'id',
    properties: {
        id: 'int',
        heading: 'string',
        text: 'string',
        version: 'int',
        created_at: 'date',
    },
};

/**
 * @typedef TransactionJobType
 * @property {number} id
 * @property {number} timeout
 * @property {string} processor
 * @property {object} data
 * @property {string} status
 * @property {number} version
 * @property {string} successHeading
 * @property {string} successBody
 * @property {string} failHeading
 * @property {string} failBody
 */
export type TransactionJobType = {
    id: number,
    timeout: number,
    processor: string,
    data: ?string,
    successHeading: string,
    successBody: string,
    failHeading: string,
    failBody: string,
    status: 'WAITING' | 'DONE' | 'PROCESSING' | 'FAILED',
    version: number
}

export const TransactionJobSchema = {
    name: 'TransactionJob',
    primaryKey: 'id',
    properties: {
        id: 'int',
        timeout: 'int',
        processor: 'string',
        data: {
            type: 'string',
            optional: true,
        },
        successHeading: 'string',
        successBody: 'string',
        failHeading: 'string',
        failBody: 'string',
        status: 'string',
        version: 'int',
    },
};

/**
 * @typedef NationType
 * @property {number} id
 * @property {number} idInSmartContract
 * @property {boolean} created Created mean's if it is on the blockchain
 * @property {string} nationName
 * @property {string} nationDescription
 * @property {boolean} exists
 * @property {boolean} virtualNation
 * @property {string} nationCode
 * @property {string} lawEnforcementMechanism
 * @property {boolean} profit
 * @property {boolean} nonCitizenUse
 * @property {boolean} diplomaticRecognition
 * @property {string} decisionMakingProcess
 * @property {string} governanceService
 */
export type NationType = {
    id: number,
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
    txHash: string
}

export const NationSchema = {
    name: 'Nation',
    primaryKey: 'id',
    properties: {
        id: 'int',
        idInSmartContract: {
            default: -1,
            type: 'int',
        },
        txHash: {
            type: 'string',
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

export const schemata = 
[
    ProfileSchema,
    AccountBalanceSchema,
    MessageJobSchema,
    TransactionJobSchema,
    NationSchema,
];

export const migration = () => {};