import { call } from 'redux-saga/effects';

import startProcessing from '../../../src/sagas/transactions';
import { getPangeaLibrary } from '../../../src/services/container';

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
  expect(iterator.next(pangeaLibrary).value)
    .toEqual(call([pangeaLibrary.queue.txQueue, pangeaLibrary.queue.txQueue.startProcessing]));
  expect(iterator.next(pangeaLibrary).value)
    .toEqual(call([pangeaLibrary.queue.txQueue, pangeaLibrary.queue.txQueue.startProcessing]));
});
