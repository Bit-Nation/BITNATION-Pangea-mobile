import { call, put, select, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import watchNationsUpdate, { checkConnection, createNation, fetchNations, joinNation, leaveNation, getNations } from '../../../src/sagas/nations'
import {
  CANCEL_NATION_CREATE, DONE_NATION_CREATE, START_NATIONS_FETCH, DONE_FETCH_NATIONS,
  NATION_CREATE, CANCEL_LOADING, REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION,
} from '../../../src/actions/nations'
import { getPangeaLibrary } from '../../../src/services/container'

jest.mock('BITNATION-Pangea-libs')
jest.mock('react-native-config')

const pangeaLibrary = {
  eth: {
    nation: {
      create: jest.fn(),
      all: jest.fn(),
      index: jest.fn(),
      joinNation: jest.fn(),
      leaveNation: jest.fn()
    }
  }
}

test('sagas - nation watcher', (done) => {
  const iterator = watchNationsUpdate()
  expect(iterator.next().value).toEqual(takeEvery(NATION_CREATE, createNation))
  expect(iterator.next().value).toEqual(takeEvery(START_NATIONS_FETCH, fetchNations))
  expect(iterator.next().value).toEqual(takeEvery(REQUEST_JOIN_NATION, joinNation))
  expect(iterator.next().value).toEqual(takeEvery(REQUEST_LEAVE_NATION, leaveNation))
  done()
})

test('sagas - createNation', (done) => {
  const mockAction = {
    type: NATION_CREATE,
    payload: {
      name: 'test nation',
      description: 'test'
    },
    navigator: {
      dismissModal: function(){}
    }
  }  
  const iterator = cloneableGenerator(createNation)(mockAction)
  expect(iterator.next().value).toEqual(call(getPangeaLibrary))
  expect(iterator.next(pangeaLibrary).value).toEqual(call(checkConnection))
  expect(iterator.next().value).toEqual(call(pangeaLibrary.eth.nation.create, mockAction.payload))

  // mock success case
  const successIterator = iterator.clone()
  expect(successIterator.next().value).toEqual(put({ type: DONE_NATION_CREATE }))
  expect(successIterator.next().value).toEqual(call([mockAction.navigator, 'dismissModal']))
  expect(successIterator.next().value).toEqual(put({ type: START_NATIONS_FETCH }))

  // clone and test the failure case
  const failureIterator = iterator.clone()
  expect(failureIterator.throw('error').value).toEqual(put({ type: CANCEL_LOADING }))

  done()
})

test('sagas - fetchNations', (done) => {
  const mockAction = {
    type: START_NATIONS_FETCH
  }
  const iterator = cloneableGenerator(fetchNations)(mockAction)
  expect(iterator.next().value).toEqual(call(getPangeaLibrary))
  expect(iterator.next(pangeaLibrary).value).toEqual(call(checkConnection))
  expect(iterator.next().value).toEqual(call(pangeaLibrary.eth.nation.index))
  expect(iterator.next().value).toEqual(call(pangeaLibrary.eth.nation.all))

  // mock success case
  const successIterator = iterator.clone()
  const mockNations = [
    {
      name: 'Mock Nation',
      id: '12345'
    }
  ]
  expect(successIterator.next(mockNations).value).toEqual(put({ type: DONE_FETCH_NATIONS, payload: mockNations }))
  
  // clone and test the failure case
  const failureIterator = iterator.clone()
  expect(failureIterator.throw('error').value).toEqual(put({ type: CANCEL_LOADING }))

  done()
})

test('sagas - joinNation', (done) => {
  const mockAction = {
    type: REQUEST_JOIN_NATION
  }
  const iterator = cloneableGenerator(joinNation)(mockAction)
  expect(iterator.next().value).toEqual(call(getPangeaLibrary))
  expect(iterator.next(pangeaLibrary).value).toEqual(select(getNations))
  
  const mockNations = {
    openedNationId: '12345',
    nations: [
      {
        name: 'Mock Nation',
        id: '12345'
      }
    ]
  }
  expect(iterator.next(mockNations).value).toEqual(call(checkConnection))
  expect(iterator.next().value).toEqual(call(pangeaLibrary.eth.nation.joinNation, mockNations.openedNationId))

  // mock success case
  const successIterator = iterator.clone()
  expect(successIterator.next().value).toEqual(put({ type: CANCEL_LOADING }))
  expect(successIterator.next().value).toEqual(put({ type: START_NATIONS_FETCH }))

  // clone and test the failure case
  const failureIterator = iterator.clone()
  expect(failureIterator.throw('error').value).toEqual(put({ type: CANCEL_LOADING }))

  done()
})

test('sagas - leaveNation', (done) => {
  const mockAction = {
    type: REQUEST_LEAVE_NATION
  }
  const iterator = cloneableGenerator(leaveNation)(mockAction)
  expect(iterator.next().value).toEqual(call(getPangeaLibrary))
  expect(iterator.next(pangeaLibrary).value).toEqual(select(getNations))
  
  const mockNations = {
    openedNationId: '12345',
    nations: [
      {
        name: 'Mock Nation',
        id: '12345'
      }
    ]
  }
  expect(iterator.next(mockNations).value).toEqual(call(checkConnection))
  expect(iterator.next().value).toEqual(call(pangeaLibrary.eth.nation.leaveNation, mockNations.openedNationId))

  // mock success case
  const successIterator = iterator.clone()
  expect(successIterator.next().value).toEqual(put({ type: CANCEL_LOADING }))
  expect(successIterator.next().value).toEqual(put({ type: START_NATIONS_FETCH }))

  // clone and test the failure case
  const failureIterator = iterator.clone()
  expect(failureIterator.throw('error').value).toEqual(put({ type: CANCEL_LOADING }))

  done()
})
