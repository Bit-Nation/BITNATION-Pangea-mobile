//@flow

import pangeaLibsFactory from 'BITNATION-Pangea-libs'
import secureStorage from './panthalassa/secureStorage';
import osDeps from './panthalassa/osDependencies';
import ethDaemon from './panthalassa/ethDaemon';
import {NetInfo} from 'react-native';
import {APP_ONLINE, APP_OFFLINE} from 'BITNATION-Pangea-libs/src/events'
import config from 'react-native-config';
import {Alert} from 'react-native';
import {ETH_TX_SIGN} from 'BITNATION-Pangea-libs/src/events'
const EventEmitter = require('eventemitter3');

const DB_PATH = 'pangea';

if(!config.ETH_HTTP_ENDPOINT){
    throw new Error(`Please set the "ETH_HTTP_ENDPOINT" env variable (checkout the Readme)`);
}

let production = config.PRODUCTION;

if(production === 'false'){
    production = false;
}

if(production === 'true'){
    production = true;
}

if(production){
    throw new Error(`Please set the "PRODUCTION" env variable to an boolean value (checkout the readme)`);
}

const PangeaLibFactory:Promise<*> = new Promise((res, rej) => {

    const ee = new EventEmitter();

    ee.on(ETH_TX_SIGN, function (data) {
        Alert.alert(
            `Sign Transaction`,
            `Send ${data.value} ETH from ${data.from} to ${data.to} (${data.eth} ETH transaction fee)`,
            [
                {text: 'Cancel', onPress: data.abort, style: 'cancel'},
                {text: 'OK', onPress: data.confirm},
            ],
            { cancelable: false }
        )
    });

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
            isConnected,
            config.PRODUCTION
        ))
        .then(res)
        .catch(rej);

});

export default PangeaLibFactory;

