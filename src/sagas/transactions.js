import { call } from 'redux-saga/effects';

import { getPangeaLibrary } from '../services/container';
import { checkConnection } from '../utils/connectivity';

/**
 * @desc Starts worker for processing transactions.
 * @returns {void} Void.
 */
export default function* startProcessing() {
  const pangeaLibs = yield call(getPangeaLibrary);
  while (true) {
    try {
      yield call(checkConnection);
      const { txQueue } = pangeaLibs.queue;
      yield call([txQueue, txQueue.startProcessing]);
    } catch (e) {
      console.log(`Processing error: ${e.toString()}`);
    }
  }
}

