import { call, put, select, takeEvery } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import watchNationsUpdate, {
  joinNation,
  leaveNation,
  getNations,
  syncNations,
  startNationIndexingWorker,
} from '../../../src/sagas/nations';
import {
  CANCEL_LOADING,
  REQUEST_JOIN_NATION,
  REQUEST_LEAVE_NATION,
  doneSyncNations,
  doneFetchNations,
  fetchNationsStarted,
  START_NATIONS_SYNC,
  requestSyncNations,
} from '../../../src/actions/nations';
import { convertFromDatabase, resolveNation } from '../../../src/utils/nations';
import { getPangeaLibrary } from '../../../src/services/container';
import { checkConnection } from '../../../src/sagas/connection';

jest.mock('BITNATION-Pangea-libs');
jest.mock('react-native-config');

const pangeaLibrary = {
  eth: {
    nation: {
      create: jest.fn(),
      all: jest.fn(),
      index: jest.fn(),
      joinNation: jest.fn(),
      leaveNation: jest.fn(),
    },
  },
};

test('sagas - nation watcher', (done) => {
  const iterator = watchNationsUpdate();
  expect(iterator.next().value).toEqual(takeEvery(START_NATIONS_SYNC, syncNations));
  expect(iterator.next().value).toEqual(takeEvery(REQUEST_JOIN_NATION, joinNation));
  expect(iterator.next().value).toEqual(takeEvery(REQUEST_LEAVE_NATION, leaveNation));
  expect(iterator.next().value).toEqual(call(startNationIndexingWorker));
  done();
});

test('sagas - syncNations', (done) => {
  const mockNations = [
    {
      name: 'Mock Nation',
      id: '12345',
      governanceService: 'Mock Service',
    },
  ];
  const iterator = cloneableGenerator(syncNations)();
  expect(iterator.next().value).toEqual(call(getPangeaLibrary));
  expect(iterator.next(pangeaLibrary).value).toEqual(call(pangeaLibrary.eth.nation.all));
  expect(iterator.next(mockNations).value)
    .toEqual(put(doneSyncNations(mockNations.map(convertFromDatabase))));

  done();
});

test('sagas - startNationIndexingWorker', (done) => {
  const iterator = cloneableGenerator(startNationIndexingWorker)();
  expect(iterator.next().value).toEqual(call(getPangeaLibrary));
  expect(iterator.next(pangeaLibrary).value).toEqual(put(fetchNationsStarted()));
  expect(iterator.next().value).toEqual(call(checkConnection));
  expect(iterator.next().value).toEqual(call(pangeaLibrary.eth.nation.index));
  expect(iterator.next().value).toEqual(call(syncNations));

  // mock success case
  const successIterator = iterator.clone();

  expect(successIterator.next().value).toEqual(put(doneFetchNations()));

  // clone and test the failure case
  const failureIterator = iterator.clone();
  expect(failureIterator.throw('error').value).toEqual(put({ type: CANCEL_LOADING }));

  done();
});

test('sagas - joinNation', (done) => {
  const mockAction = {
    type: REQUEST_JOIN_NATION,
  };
  const iterator = cloneableGenerator(joinNation)(mockAction);
  expect(iterator.next().value).toEqual(call(getPangeaLibrary));
  expect(iterator.next(pangeaLibrary).value).toEqual(select(getNations));

  const mockNations = {
    openedNationId: '12345',
    nations: [
      {
        name: 'Mock Nation',
        id: '12345',
      },
    ],
  };
  expect(iterator.next(mockNations).value).toEqual(call(checkConnection));
  expect(iterator.next().value).toEqual(call(
    pangeaLibrary.eth.nation.joinNation,
    resolveNation(mockNations.nations, mockNations.openedNationId),
  ));

  // mock success case
  const successIterator = iterator.clone();
  expect(successIterator.next().value).toEqual(put({ type: CANCEL_LOADING }));
  expect(successIterator.next().value).toEqual(put(requestSyncNations()));

  // clone and test the failure case
  const failureIterator = iterator.clone();
  expect(failureIterator.throw('error').value).toEqual(put({ type: CANCEL_LOADING }));

  done();
});

test('sagas - leaveNation', (done) => {
  const mockAction = {
    type: REQUEST_LEAVE_NATION,
  };
  const iterator = cloneableGenerator(leaveNation)(mockAction);
  expect(iterator.next().value).toEqual(call(getPangeaLibrary));
  expect(iterator.next(pangeaLibrary).value).toEqual(select(getNations));

  const mockNations = {
    openedNationId: '12345',
    nations: [
      {
        name: 'Mock Nation',
        id: '12345',
      },
    ],
  };

  expect(iterator.next(mockNations).value).toEqual(call(checkConnection));
  expect(iterator.next().value).toEqual(call(
    pangeaLibrary.eth.nation.leaveNation,
    resolveNation(mockNations.nations, mockNations.openedNationId),
  ));

  // mock success case
  const successIterator = iterator.clone();
  expect(successIterator.next().value).toEqual(put({ type: CANCEL_LOADING }));
  expect(successIterator.next().value).toEqual(put(requestSyncNations()));

  // clone and test the failure case
  const failureIterator = iterator.clone();
  expect(failureIterator.throw('error').value).toEqual(put({ type: CANCEL_LOADING }));

  done();
});
