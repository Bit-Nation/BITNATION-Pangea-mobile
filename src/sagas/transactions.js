import { call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { getPangeaLibrary } from '../services/container';
import { TRANSACTIONS_WORKER_RECOVER_DELAY } from '../global/Constants';

/**
 * @desc Starts worker for processing transactions.
 * @returns {void} Void.
 */
export default function* startProcessing() {
  const pangeaLibs = yield call(getPangeaLibrary);
  while (true) {
    try {
      const { txQueue } = pangeaLibs.queue;
      yield call([txQueue, txQueue.startProcessing]);
    } catch (e) {
      yield call(delay, TRANSACTIONS_WORKER_RECOVER_DELAY);
      console.log(`Processing error: ${e.toString()}`);
    }
  }
}

