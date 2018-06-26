import { api_proto } from '../../../../src/services/upstream/compiledReqeust';
import Upstream from '../../../../src/services/upstream/upstream';

const { Request } = api_proto;

jest.mock('react-native', () => ({
  NativeEventEmitter: (config) => {
    return {
      addListener: jest.fn((name, request) => {
        console.log('handling request');
      }),
    };
  },
  NativeModules: {},
}));

describe('upstream', () => {
  let upstream;
  test('Initialize the upstream service', async () => {
    const message = Request.create({ requestId: 2 });
    const encodedRequest = Request.encode(message).finish();
    upstream = new Upstream();
    upstream.handleRequest(encodedRequest);
  });
});
