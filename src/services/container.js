//@flow

import db from 'BITNATION-Panthalassa/src/database/db';
import secureStorage from './panthalassa/secureStorage';
import ethUtils from 'BITNATION-Panthalassa/src/ethereum/utils';
import web3 from 'BITNATION-Panthalassa/src/ethereum/web3';
import osDeps from './panthalassa/osDependencies';
import ethDaemon from './panthalassa/ethDaemon';
import wallet from 'BITNATION-Panthalassa/src/ethereum/wallet';
import profile from 'BITNATION-Panthalassa/src/profile/profile';

async function createContainer() {
  const EventEmitter = require('eventemitter3');

  const DB_PATH = 'panthalassa';

  const ee = new EventEmitter();
  const dbInstance = db(DB_PATH);
  const ethUtilsInstance = ethUtils(secureStorage, ee, osDeps);
  console.log('WEB3');
  const ethWeb3Instance = await web3(ethDaemon, ee, ethUtilsInstance);
  console.log('WEB3 FINISHED');
  const ethWallet = wallet(ethUtilsInstance, ethWeb3Instance, dbInstance);
  const profileInstance = profile(dbInstance, ethUtilsInstance);

  return {
    eventEmitter: ee,
    panthalassa: {
      database: dbInstance,
      ethereum: {
        utils: ethUtilsInstance,
        web3: ethWeb3Instance,
        wallet: ethWallet,
      },
      profile: profileInstance,
    },
  };
}

export default createContainer();