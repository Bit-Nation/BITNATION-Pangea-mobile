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


/**
 * @alias container
 * @desc DI - Container. The exported container it self is NOT exported as a singleton. You need to take care about that your self.
 * @example
 *
 *   //Import the container
 *  `import container from 'src/services/container'`
 *
 *   //Fetch a service from it
 *  `const myService = container.resolve('myServiceName');`
 *
 *  Available services are:
 *  * `eventEmitter`            (an instance of {@link https://www.npmjs.com/package/eventemitter3 EventEmitter3})
 *
 */
const container = createContainer();

container.register({

    'eventEmitter' : asFunction(_ => new EventEmitter()).singleton(),

    'panthalassa:database:db' : asFunction(_ => db()).singleton(),

    'panthalassa:ethereum:utils' : asFunction(container => ethUtils(
        secureStorage,
        container['eventEmitter'],
        osDeps
    )).singleton(),

    'panthalassa:ethereum:web3' : asFunction(container => web3(
        ethDaemon,
        container['eventEmitter'],
        container['panthalassa:ethereum:utils'])
    ).singleton(),

    'panthalassa:ethereum:wallet' : asFunction(container => wallet(
        container['panthalassa:ethereum:utils'],
        container['panthalassa:ethereum:web3'],
        container['panthalassa:database:db']
    )).singleton(),

    'panthalassa:profile:profile' : asFunction(container => profile(
        container['panthalassa:database:db'],
        container['panthalassa:ethereum:utils']
    )).singleton()

});

export default container;