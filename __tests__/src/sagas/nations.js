import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { checkConnection, createNation, fetchNations, joinNation, leaveNation, getNations } from '../../../src/sagas/nations'
import {
  CANCEL_NATION_CREATE, DONE_NATION_CREATE, START_NATIONS_FETCH, DONE_FETCH_NATIONS,
  NATION_CREATE, CANCEL_LOADING, REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION,
} from '../../../src/actions/nations';
import { getPangeaLibrary } from '../../../src/services/container';

jest.mock('BITNATION-Pangea-libs', () => ({
  eth: {
    nation: {
      create: jest.fn(),
      index: jest.fn(),
      all: jest.fn(),
      joinNation: jest.fn(),
      leaveNation: jest.fn()
    }
  }
}));

jest.mock('react-native-config', () => ({
  ETH_HTTP_ENDPOINT: 'https://rinkeby.infura.io/metamask',
  PRODUCTION: 'false'
}));

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
const stepper = (fn) => (mock) => fn.next(mock).value

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
  
  const step = stepper(createNation(mockAction))
  expect(step()).toEqual(call(getPangeaLibrary))
  expect(step(pangeaLibrary)).toEqual(call(checkConnection))
  expect(step()).toEqual(call(pangeaLibrary.eth.nation.create, mockAction.payload))
  expect(step().PUT.action.type).toEqual(DONE_NATION_CREATE)
  expect(step()).toEqual(call([mockAction.navigator, 'dismissModal']))
  expect(step().PUT.action.type).toEqual(START_NATIONS_FETCH)
  done()
})

test('sagas - fetchNations', (done) => {
  const mockAction = {
    type: START_NATIONS_FETCH
  }
  const step = stepper(fetchNations(mockAction))
  expect(step()).toEqual(call(getPangeaLibrary))
  expect(step(pangeaLibrary)).toEqual(call(checkConnection))
  expect(step()).toEqual(call(pangeaLibrary.eth.nation.index))
  expect(step()).toEqual(call(pangeaLibrary.eth.nation.all))
  const mockNations = [
    {
      name: 'Mock Nation',
      id: '12345'
    }
  ]
  console.log('call fetch now')
  const fetchAction = step(mockNations)
  console.log('fetch resolved')
  expect(fetchAction.PUT.action.type).toEqual(DONE_FETCH_NATIONS)
  expect(fetchAction.PUT.action.payload).toEqual(mockNations)
  done()
})

test('sagas - joinNation', (done) => {
  const mockAction = {
    type: REQUEST_JOIN_NATION
  }
  const step = stepper(joinNation(mockAction))
  expect(step()).toEqual(call(getPangeaLibrary))
  expect(step(pangeaLibrary)).toEqual(select(getNations))
  
  const mockNations = {
    openedNationId: '12345',
    nations: [
      {
        name: 'Mock Nation',
        id: '12345'
      }
    ]
  }
  expect(step(mockNations)).toEqual(call(checkConnection))
  expect(step()).toEqual(call(pangeaLibrary.eth.nation.joinNation, mockNations.openedNationId))
  expect(step()).toEqual(put({ type: CANCEL_LOADING }))
  expect(step()).toEqual(put({ type: START_NATIONS_FETCH }))
  done()
})

test('sagas - leaveNation', (done) => {
  const mockAction = {
    type: REQUEST_LEAVE_NATION
  }
  const step = stepper(leaveNation(mockAction))
  expect(step()).toEqual(call(getPangeaLibrary))
  expect(step(pangeaLibrary)).toEqual(select(getNations))
  
  const mockNations = {
    openedNationId: '12345',
    nations: [
      {
        name: 'Mock Nation',
        id: '12345'
      }
    ]
  }
  expect(step(mockNations)).toEqual(call(checkConnection))
  expect(step()).toEqual(call(pangeaLibrary.eth.nation.leaveNation, mockNations.openedNationId))
  expect(step()).toEqual(put({ type: CANCEL_LOADING }))
  expect(step()).toEqual(put({ type: START_NATIONS_FETCH }))
  done()
})
