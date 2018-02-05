import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { checkConnection, createNation, fetchNations, joinNation, leaveNation } from '../../../src/sagas/nations'
import {
  CANCEL_NATION_CREATE, DONE_NATION_CREATE, START_NATIONS_FETCH, DONE_FETCH_NATIONS,
  NATION_CREATE, CANCEL_LOADING, REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION,
} from '../../../src/actions/nations';
import { getPangeaLibrary } from '../../../src/services/container';

jest.mock('BITNATION-Pangea-libs', () => ({
  eth: {
    nation: {
      create: jest.fn()
    }
  }
}));

jest.mock('react-native-config', () => ({
  ETH_HTTP_ENDPOINT: 'https://rinkeby.infura.io/metamask',
  PRODUCTION: 'false'
}));

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
  const pangeaLibrary = {
    eth: {
      nation: {
        create: function(){}
      }
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
