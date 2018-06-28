import Upstream from '../../../../src/services/upstream/upstream';
import { api_proto as apiProto } from '../../../../src/services/upstream/compiled';
// import defaultDB, { buildRandomPathDatabase } from '../../../../src/services/database';

jest.mock('react-native', () => ({
  NativeEventEmitter: () => ({
    addListener: jest.fn(() => {}),
  }),
  NativeModules: {},
}));

const message = {
  requestID: '1',

  dRKeyStoreGet: {
    drKey: 1,
    messageNumber: 2,
  },

  dRKeyStorePut: {
    key: 1,
    messageNumber: 2,
    messageKey: 3,
  },

  dRKeyStoreDeleteMK: {
    key: 1,
    msgNum: 2,
  },

  dRKeyStoreDeleteKeys: {
    key: 1,
  },

  dRKeyStoreCount: {
    key: 1,
  },

  dRKeyStoreAll: {},

  showModal: {
    title: '1',
    layout: '2',
  },
  sendEthereumTransaction: {
    value: '1',
    to: '2',
    data: '3',
  },
  saveDApp: {
    appName: '1',
    code: '2',
    signature: '3',
    signingPublicKey: '4',
  },
};

describe('upstream', () => {
  test('encode request', () => {
    const { Request } = apiProto;
    const buffer = Request.encode(message).finish();
    expect(buffer).toBeDefined();
  });
});


describe('Upstream class', () => {
  test('Initialize the upstream service', () => {
    const { Request } = apiProto;
    const encodedRequest = Request.encode(message).finish();
    const upstream = new Upstream();
    upstream.handleRequest(encodedRequest);
  });
});
