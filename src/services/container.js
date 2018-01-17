//@flow

import pangeaLibsFactory from 'BITNATION-Pangea-libs'
import secureStorage from './panthalassa/secureStorage';
import osDeps from './panthalassa/osDependencies';
import ethDaemon from './panthalassa/ethDaemon';
const EventEmitter = require('eventemitter3');

const DB_PATH = 'pangea';

const ee = new EventEmitter();

export default pangeaLibsFactory(
    secureStorage,
    DB_PATH,
    ethDaemon,
    osDeps,
    ee,
    false
);

export function createPangeaLibsFactory() {
  return pangeaLibsFactory(
    secureStorage,
    DB_PATH,
    ethDaemon,
    osDeps,
    ee,
    false
  );
}