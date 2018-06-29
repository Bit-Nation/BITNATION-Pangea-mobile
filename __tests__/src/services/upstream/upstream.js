import UpstreamService from '../../../../src/services/upstream/upstream';
import { api_proto as apiProto } from '../../../../src/services/upstream/compiled';
import { buildRandomPathDatabase } from '../../../../src/services/database';

jest.mock('NativeModules', () => ({
  Panthalassa: {
    PanthalassaSendResponse: jest.fn(() => Promise.resolve('DONE')),
  },
}));

jest.mock('NativeEventEmitter', () => function () {
  return { addListener: jest.fn() };
});

jest.mock('react-native-navigation', () => ({
  Navigation: {
    showModal: jest.fn(),
  },
}));

const ethereumServiceMock = {};
const dbPromise = buildRandomPathDatabase();

const dRKeyStoreGet = {
  requestID: '1',
  dRKeyStoreGet: {
    drKey: new Int8Array(1, 2, 3),
    messageNumber: 2,
  },
};

const dRKeyStorePut = {
  requestID: '1',
  dRKeyStorePut: {
    key: new Int8Array(1, 2, 3),
    messageNumber: 2,
    messageKey: new Int8Array(1, 2, 3),
  },
};

const dRKeyStoreDeleteMK = {
  requestID: '1',
  dRKeyStoreDeleteMK: {
    key: new Int8Array(1, 2, 3),
    msgNum: 2,
  },
};

const dRKeyStoreDeleteKeys = {
  requestID: '1',
  dRKeyStoreDeleteKeys: {
    key: new Int8Array(1, 2, 3),
  },
};

const dRKeyStoreCount = {
  requestID: '1',
  dRKeyStoreCount: {
    key: new Int8Array(1, 2, 3),
  },
};

const dRKeyStoreAll = {
  requestID: '1',
  dRKeyStoreAll: {},
};

const showModal = {
  requestID: '1',
  showModal: {
    title: '1',
    layout: '2',
  },
};

const sendEthereumTransaction = {
  requestID: '1',
  sendEthereumTransaction: {
    value: '1',
    to: '2',
    data: '3',
  },
};

const saveDApp = {
  requestID: '1',
  saveDApp: {
    appName: '1',
    code: '2',
    signature: new Int8Array('test'),
    signingPublicKey: new Int8Array('test'),
  },
};

const { Request } = apiProto;

const prepareRequest = object => Request.encode(object).finish();

describe('Request', () => {
  test('encoding', () => {
    expect(prepareRequest(dRKeyStoreGet)).toBeDefined();
    expect(prepareRequest(dRKeyStorePut)).toBeDefined();
    expect(prepareRequest(dRKeyStoreDeleteMK)).toBeDefined();
    expect(prepareRequest(dRKeyStoreDeleteKeys)).toBeDefined();
    expect(prepareRequest(dRKeyStoreCount)).toBeDefined();
    expect(prepareRequest(dRKeyStoreAll)).toBeDefined();
    expect(prepareRequest(showModal)).toBeDefined();
    expect(prepareRequest(sendEthereumTransaction)).toBeDefined();
    expect(prepareRequest(saveDApp)).toBeDefined();
  });
});


describe('Upstream class', () => {
  test('Handle requests', async () => {
    expect.assertions(9);
    const upstream = new UpstreamService(ethereumServiceMock, dbPromise, 1);
    const result = await upstream.handleRequest(prepareRequest(dRKeyStoreGet));
    expect(result).toBeDefined();
    expect(await upstream.handleRequest(prepareRequest(dRKeyStorePut))).toBeDefined();
    expect(await upstream.handleRequest(prepareRequest(dRKeyStoreDeleteMK))).toBeDefined();
    expect(await upstream.handleRequest(prepareRequest(dRKeyStoreDeleteKeys))).toBeDefined();
    expect(await upstream.handleRequest(prepareRequest(dRKeyStoreCount))).toBeDefined();
    expect(await upstream.handleRequest(prepareRequest(dRKeyStoreAll))).toBeDefined();
    expect(await upstream.handleRequest(prepareRequest(showModal))).toBeDefined();
    expect(await upstream.handleRequest(prepareRequest(sendEthereumTransaction))).toBeDefined();
    expect(await upstream.handleRequest(prepareRequest(saveDApp))).toBeDefined();
  });
});
