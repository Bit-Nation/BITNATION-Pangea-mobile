import { NativeModules } from 'react-native';
import osDeps from '../../../../src/services/panthalassa/osDependencies';

const RNRandomBytes = NativeModules.RNRandomBytes;

// Mock react native
jest.mock('react-native', () => ({
  NativeModules: {
    RNRandomBytes: {
      randomBytes: jest.fn(),
    },
  },
}));

// Reset randomBytes method before test
beforeEach(() => RNRandomBytes.randomBytes = jest.fn());

describe('osDependencies', () => {
  describe('crypto - randomBytes', () => {
    test('success', () => {
      // Let random bytes return an random number of bytes in base64
      RNRandomBytes.randomBytes = (length, cb) => {
        expect(length).toBe(44);

        cb(null, 'SJo+nMraLhepuBeRQyjeclBFWeq9lP5cApIti4K7CbJX0u+hpGuzUebnz7o=');
      };

      return expect(osDeps.crypto.randomBytes(44)).resolves.toBe('489a3e9ccada2e17a9b817914328de72504559eabd94fe5c02922d8b82bb09b257d2efa1a46bb351e6e7cfba');
    });

    test('fail', () => {
      const error = new Error();

      // Let random bytes return an random number of bytes in base64
      RNRandomBytes.randomBytes = (length, cb) => cb(error);

      return expect(osDeps.crypto.randomBytes(44)).rejects.toBe(error);
    });
  });
});
