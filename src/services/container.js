// @flow

import pangeaLibsFactory from 'BITNATION-Pangea-libs';
import { roundEth, shortEthAddress } from '../utils/formatters';
import secureStorage from './panthalassa/secureStorage';
import osDeps from './panthalassa/osDependencies';
import ethDaemon from './panthalassa/ethDaemon';
import { NetInfo } from 'react-native';
import { APP_ONLINE, APP_OFFLINE } from 'BITNATION-Pangea-libs/src/events';
import config from 'react-native-config';
import { Alert } from 'react-native';
import { ETH_TX_SIGN } from 'BITNATION-Pangea-libs/src/events';

const EventEmitter = require('eventemitter3');

const DB_PATH = 'pangea';

if (!config.ETH_HTTP_ENDPOINT) {
  throw new Error('Please set the "ETH_HTTP_ENDPOINT" env variable (checkout the Readme)');
}

let production = config.PRODUCTION;

if (!production) {
  throw new Error('Please set the "PRODUCTION" env variable to an boolean value (checkout the readme)');
}

if (production === 'false') {
  production = false;
}

if (production === 'true') {
  production = true;
}

const PangeaLibFactory:Promise<*> = new Promise((res, rej) => {
  const ee = new EventEmitter();

  ee.on(ETH_TX_SIGN, (data) => {
    Alert.alert(
      'Sign Transaction',
      `Send ${roundEth(data.value)} ETH from ${shortEthAddress(data.from)} to ${shortEthAddress(data.to)} (${roundEth(data.transactionFee)} ETH transaction fee)`,
      [
        { text: 'Cancel', onPress: data.abort, style: 'cancel' },
        { text: 'OK', onPress: data.confirm },
      ],
      { cancelable: false },
    );
  });

  /**
     * @desc Inform pangea utils about connectivity change
     */
  NetInfo.isConnected.addEventListener('connectionChange', (isConnected) => {
    if (isConnected === false) {
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
      production,
    ))
    .then(res)
    .catch(rej);
});

export default PangeaLibFactory;

export function getPangeaLibrary() {
  return PangeaLibFactory;
}
