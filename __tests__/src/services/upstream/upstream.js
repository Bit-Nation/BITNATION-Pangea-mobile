import UpstreamService from '../../../../src/services/upstream/upstream';
import { api_proto as apiProto } from '../../../../src/services/upstream/compiled';

jest.mock('NativeModules', () => ({
  Panthalassa: {
    PanthalassaSendResponse: jest.fn(),
  },
}));

jest.mock('NativeEventEmitter', () => function () {
  return { addListener: jest.fn() };
});

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
  test('Initialize the upstream service', async () => {
    expect.assertions(2);
    const { Request } = apiProto;
    const encodedRequest = Request.encode(message).finish();
    expect(encodedRequest).toBeDefined();
    const upstream = new UpstreamService();
    let error;
    try {
      await upstream.handleRequest(encodedRequest);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(undefined);
  });
});
