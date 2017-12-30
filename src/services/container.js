//@flow

import db from 'BITNATION-Panthalassa/src/database/db'
import secureStorage from './panthalassa/secureStorage'
import ethUtils from 'BITNATION-Panthalassa/src/ethereum/utils'
import web3 from 'BITNATION-Panthalassa/src/ethereum/web3'
import osDeps from './panthalassa/osDependencies'
import ethDaemon from './panthalassa/ethDaemon'
import wallet from 'BITNATION-Panthalassa/src/ethereum/wallet';
import profile from 'BITNATION-Panthalassa/src/profile/profile';

const {asFunction, createContainer} = require('awilix/lib/awilix.browser');
const EventEmitter = require('eventemitter3');

const container = createContainer();

container.register({

    'eventEmitter' : asFunction(_ => new EventEmitter()),

    'panthalassa:database:db' : asFunction(_ => db()),

    'panthalassa:ethereum:utils' : asFunction(container => ethUtils(
        secureStorage,
        container['eventEmitter'],
        osDeps
    )),

    'panthalassa:ethereum:web3' : asFunction(container => web3(
        ethDaemon,
        container['eventEmitter'],
        container['panthalassa:ethereum:utils'])
    ),

    'panthalassa:ethereum:wallet' : asFunction(container => wallet(
        container['panthalassa:ethereum:utils'],
        container['panthalassa:ethereum:web3'],
        container['panthalassa:database:db']
    )),

    'panthalassa:profile:profile' : asFunction(container => profile(
        container['panthalassa:database:db'],
        container['panthalassa:ethereum:utils']
    ))

});

export default container;