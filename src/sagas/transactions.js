import { call } from 'redux-saga/effects';

import { getPangeaLibrary } from '../services/container';

/**
 * @desc Starts worker for processing transactions.
 * @returns {void} Void.
 */
export default function* startProcessing() {
  const pangeaLibs = yield call(getPangeaLibrary);
  const { txQueue } = pangeaLibs.queue;
  while (true) {
    yield call([txQueue, txQueue.startProcessing]);
  }
}

