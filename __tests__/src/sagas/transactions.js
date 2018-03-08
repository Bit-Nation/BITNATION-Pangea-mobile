import { call } from 'redux-saga/effects';

import startProcessing from '../../../src/sagas/transactions';
import { getPangeaLibrary } from '../../../src/services/container';
import { checkConnection } from '../../../src/utils/connectivity';

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

  expect(iterator.next(pangeaLibrary).value).toEqual(call(checkConnection));
  expect(iterator.next().value)
    .toEqual(call([pangeaLibrary.queue.txQueue, pangeaLibrary.queue.txQueue.startProcessing]));

  expect(iterator.next().value).toEqual(call(checkConnection));
  expect(iterator.next().value)
    .toEqual(call([pangeaLibrary.queue.txQueue, pangeaLibrary.queue.txQueue.startProcessing]));

  expect(iterator.next().value).toEqual(call(checkConnection));
  expect(iterator.throw('error').value).toEqual(call(checkConnection));

  expect(iterator.next().value)
    .toEqual(call([pangeaLibrary.queue.txQueue, pangeaLibrary.queue.txQueue.startProcessing]));
});
