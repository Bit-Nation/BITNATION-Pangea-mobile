// @flow
// Schema v1: Effective from 0.3.2 to Current

import {TX_JOB_STATUS_PENDING, TX_JOB_TYPE_NATION_CREATE} from '../../../src/queues/transaction';

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
    params: string,
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
 * @property {boolean} stateMutateAllowed Hold information about if we can mutate the state of this nation. Since we only support synchronous mutate of the nation state (join/leave nation).
 * @property {boolean} determinants if we should reset (set to true) the  stateMutateAllowed on the next indexing round.
 * @property {TransactionJobType | null} tx A transaction. It can be e.g. a transaction that is responsible for writing the nation to the blockchain.
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
    stateMutateAllowed: boolean,
    resetStateMutateAllowed: boolean,
    tx: TransactionJobType | null
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
    ProfileSchema,
    AccountBalanceSchema,
    MessageJobSchema,
    TransactionJobSchema,
    NationSchema,
];

export const migration = (oldRealm: any, newRealm: any) => {
    // Migrate nation's
    // 1. Create tx job from tx hash with the status pending.
    //   Pending because an but in 0.3.1 prevented us from submitting the nations
    oldRealm.objects('Nation').map((oldNation) => {
        const newNation = newRealm.objects('Nation').filtered(`id = "${oldNation.id}"`)[0];

        if (!newNation) {
            throw new Error(`Couldn't find nation for id: ${oldNation.id}`);
        }

        // Nation's index by version 0.3.1 contain the tx hash by default.
        // That's the reason why we need to check if the dataset is a local created one
        if (oldNation.idInSmartContract !== -1) {
            return;
        }

        // Not all nation's have a transaction hash
        if (oldNation.tx !== null) {
            newNation.tx = newRealm.create('TransactionJob', {
                txHash: oldNation.txHash,
                status: TX_JOB_STATUS_PENDING,
                type: TX_JOB_TYPE_NATION_CREATE,
            });
        }
    });
};
