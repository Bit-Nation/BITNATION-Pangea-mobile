import { api_proto } from '../../../../src/services/upstream/compiledResponse';

const { Response } = api_proto;

const message = {

  dRKeyStoreGet: {
    messageKey: 1,
  },

  dRKeyStoreCount: {
    count: 1,
  },

  dRKeyStoreAll: {},
  sendEthereumTransaction: {
    nonce: 1,
    gasPrice: '2',
    gasLimit: '100000',
    value: '1',
    to: '2',
    data: '3',
    v: '1',
    r: '1',
    s: '1',
    chainId: 1,
    from: '0x0',
    hash: '0x0',
  },
};

describe('response upstream', () => {
  test('encode request', () => {
    const buffer = Response.encode(message).finish();
    expect(buffer).toBeDefined();
  });
});


// describe('Upstream class', () => {
//   let upstream;
//   test('Initialize the upstream service', async () => {
//     const encodedRequest = Request.encode(message).finish();
//     upstream = new Upstream();
//     upstream.handleRequest(encodedRequest);
//   });
// });
