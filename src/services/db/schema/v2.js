// @flow
// Schema v2: Effective from 0.3.3 to Current

export class Profile {

    id: number;
    name:string;
    location:string;
    latitude:string;
    longitude:string;
    description:string;
    image:string;
    version:string;

    schema: {
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
        }
    };

}

export class AccountBalance {

    id:string;
    address:string;
    amount:string;
    synced_at:Date;
    currency:string;

    schema: {
        name: 'AccountBalance',
        primaryKey: 'id',
        properties: {
            id: 'string',
            address: 'string',
            amount: 'string',
            synced_at: 'date',
            currency: 'string',
        }
    }

}

export class MessageJob {

    id:number;
    heading:string | null;
    interpret: boolean;
    params: string;
    display: boolean;
    msg: string;
    version: number;
    created_at: Date;

    schema: {
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
        }
    }

}

export class TransactionJob {

    txHash: string;
    status: number;
    type: string;
    nation: Nation | null;

    schema: {
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
    }
}

export class Nation {

    id: number;
    idInSmartContract: number;
    created: boolean;
    nationName: string;
    nationDescription: string;
    exists: boolean;
    virtualNation: boolean;
    nationCode: string;
    lawEnforcementMechanism: string;
    profit: boolean;
    nonCitizenUse: boolean;
    diplomaticRecognition: boolean;
    decisionMakingProcess: string;
    governanceService: string;
    citizens: number;
    joined: boolean;
    stateMutateAllowed: boolean;
    resetStateMutateAllowed: boolean;
    tx: TransactionJob | null;

    schema: {
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
    }
}

export const schemata =
    [
        Profile,
        AccountBalance,
        MessageJob,
        TransactionJob,
        Nation,
    ];

export const migration = (oldRealm: any, newRealm: any) => {

    //@todo 0.3.3 remove `created` prop from nation schema

};
