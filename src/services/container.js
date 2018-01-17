//@flow

import pangeaLibsFactory from 'BITNATION-Pangea-libs'
import secureStorage from './panthalassa/secureStorage';
import osDeps from './panthalassa/osDependencies';
import ethDaemon from './panthalassa/ethDaemon';
import {NetInfo} from 'react-native';
import {APP_ONLINE, APP_OFFLINE} from 'BITNATION-Pangea-libs/src/events'
const EventEmitter = require('eventemitter3');

const DB_PATH = 'pangea';

export default new Promise((res, rej) => {

    const ee = new EventEmitter();

    /**
     * @desc Inform pangea utils about connectivity change
     */
    NetInfo.isConnected.addEventListener('connectionChange', isConnected => {

        if(false === isConnected){
            ee.emit(APP_OFFLINE);
            return;
        }

        ee.emit(APP_ONLINE);

    });

    NetInfo
        .isConnected
        .fetch()
        .then(isConnected => pangeaLibsFactory(
            secureStorage,
            DB_PATH,
            ethDaemon,
            osDeps,
            ee,
            isConnected
        ))
        .then(res)
        .catch(rej);

})