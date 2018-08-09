import { api_proto as apiProto } from '../../../../src/services/upstream/compiled';

const { Response } = apiProto;

const message = {
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

