import { call } from 'redux-saga/effects';

import { getPangeaLibrary } from '../services/container';

export default function* startProcessing() {
  const pangeaLibs = yield call(getPangeaLibrary);
  while (true) {
    yield pangeaLibs.queue.txQueue.startProcessing();
  }
}

