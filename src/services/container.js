//@flow

import db from 'BITNATION-Panthalassa/src/database/db'
import secureStorage from './panthalassa/secureStorage'
import ethUtils from 'BITNATION-Panthalassa/src/ethereum/utils'
import web3 from 'BITNATION-Panthalassa/src/ethereum/web3'
import osDeps from './panthalassa/osDependencies'
import ethDaemon from './panthalassa/ethDaemon'
import wallet from 'BITNATION-Panthalassa/src/ethereum/wallet';
import profile from 'BITNATION-Panthalassa/src/profile/profile';

const EventEmitter = require('eventemitter3');

const ee = new EventEmitter();
const dbInstance = db();
const ethUtilsInstance = ethUtils(secureStorage, ee, osDeps);
const ethWeb3Instance = web3(ethDaemon, ee, ethUtilsInstance);
const ethWallet = wallet(ethUtilsInstance, ethWeb3Instance, dbInstance);
const profileInstance = profile(dbInstance, ethUtilsInstance);

/**
 * @alias src/services/container.js
 * @desc An object holding all available services
 * @type {{eventEmitter, panthalassa: {database: DB, ethereum: {utils: EthUtilsInterface, web3: function(), wallet: WalletInterface}, profile: Profile}}}
 */
const container = {
    eventEmitter: ee,
    panthalassa: {
        database: dbInstance,
        ethereum: {
            utils: ethUtilsInstance,
            web3: ethWeb3Instance,
            wallet: ethWallet
        },
        profile: profileInstance
    }
};

Object.freeze(container);

export default container;
