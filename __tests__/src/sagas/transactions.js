/* eslint-disable */

import { delay } from 'redux-saga';
import { call } from 'redux-saga/effects';

import startProcessing from '../../../src/sagas/transactions';
import { getPangeaLibrary } from '../../../src/services/container';
import { TRANSACTIONS_WORKER_RECOVER_DELAY } from '../../../src/global/Constants';

const pangeaLibrary = {
  queue: {
    txQueue: {
      startProcessing: jest.fn(),
    },
  },
};

test('startProcessing saga', () => {
  const iterator = startProcessing();
  expect(iterator.next().value).toEqual(call(getPangeaLibrary));

  expect(iterator.next(pangeaLibrary).value)
    .toEqual(call([pangeaLibrary.queue.txQueue, pangeaLibrary.queue.txQueue.startProcessing]));

  expect(iterator.next().value)
    .toEqual(call([pangeaLibrary.queue.txQueue, pangeaLibrary.queue.txQueue.startProcessing]));

  expect(iterator.throw('error').value).toEqual(call(delay, TRANSACTIONS_WORKER_RECOVER_DELAY));

  expect(iterator.next().value)
    .toEqual(call([pangeaLibrary.queue.txQueue, pangeaLibrary.queue.txQueue.startProcessing]));
});
