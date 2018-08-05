import { Buffer } from 'buffer';

import UpstreamService from '../../../../src/services/upstream/upstream';
import { api_proto as apiProto } from '../../../../src/services/upstream/compiled';

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

const dAppPersisted = {
  name: 'DAPP:PERSISTED',
  payload: {
    name: 'DAPP',
  },
};

const { Request } = apiProto;

const prepareClientRequest = object => ({ client: Buffer.from(Request.encode(object).finish()).toString('base64') });
const prepareUIAPIRequest = object => ({ ui: JSON.stringify(object) });

describe('Request', () => {
  test('encoding', () => {
    expect(prepareClientRequest(showModal)).toBeDefined();
    expect(prepareClientRequest(sendEthereumTransaction)).toBeDefined();
  });
});


describe('Upstream class', () => {
  test('Handle client upstream requests', async () => {
    expect.assertions(2);
    const upstream = new UpstreamService(ethereumServiceMock);
    expect(await upstream.handleRequest(prepareClientRequest(showModal))).toBeDefined();
    expect(await upstream.handleRequest(prepareClientRequest(sendEthereumTransaction))).toBeDefined();
  });
  test('Handle UI API upstream requests', async () => {
    expect.assertions(2);
    const upstream = new UpstreamService(ethereumServiceMock);
    const responsePromise = upstream.handleRequest(prepareUIAPIRequest(dAppPersisted));
    expect(responsePromise).toBeInstanceOf(Promise);
    expect(await responsePromise).toBeUndefined();
  });
});
