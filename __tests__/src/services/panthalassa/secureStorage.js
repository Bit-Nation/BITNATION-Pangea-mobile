/* eslint-disable */
import secureStorage from '../../../../src/services/panthalassa/secureStorage';
import SInfo from 'react-native-sensitive-info';

// Mock react native sensetive information
jest.mock('react-native-sensitive-info', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  getAllItems: jest.fn(),
  deleteItem: jest.fn(),
}));

// Reset all function mock's
beforeEach(() => Object.keys(SInfo).map(key => SInfo[key] = jest.fn()));

describe('secureStorage', () => {
  describe('set', () => {
    test('should return a void promise when set is successfully', () => {
      // Mock setItem
      SInfo.setItem.mockImplementation((key, value) => {
        expect(key).toBe('private_eth_key');
        expect(value).toBe('0x....');

        return new Promise((res, rej) => res('0x....'));
      });

      return expect(secureStorage.set('private_eth_key', '0x....')).resolves.toBeUndefined();
    });

    test('should reject when os fail to save', () => {
      // Mock set Item to rej
      SInfo.setItem.mockImplementation(() => new Promise((res, rej) => rej('I am an error')));

      return expect(secureStorage.set('my_key', 'my_password')).rejects.toBe('I am an error');
    });
  });

  describe('get', () => {
    test('success - should return the value for the key', () => {
      SInfo.getItem.mockImplementation((key) => {
        expect(key).toBe('private_eth_key');

        return new Promise((res, rej) => res('0x....'));
      });

      return expect(secureStorage.get('private_eth_key')).resolves.toBe('0x....');
    });

    test('fail - should reject on system error', () => {
      SInfo.getItem.mockImplementation(() => new Promise((res, rej) => rej('Could not fetch')));

      return expect(secureStorage.get('private_eth_key')).rejects.toBe('Could not fetch');
    });
  });

  describe('has', () => {
    const P = Promise;

    /**
         * It makes only sense to test primitive scala types
         */

    test('string', () => {
      SInfo.getItem.mockImplementation(() => new P((res, rej) => res('i_am_an_str_value')));

      return expect(secureStorage.has('pk')).resolves.toBe(true);
    });

    test('number', () => {
      SInfo.getItem.mockImplementation(() => new P((res, rej) => res(4)));

      return expect(secureStorage.has('pk')).resolves.toBe(true);
    });

    test('null', () => {
      SInfo.getItem.mockImplementation(() => new P((res, rej) => res(null)));

      return expect(secureStorage.has('pk')).resolves.toBe(false);
    });

    test('undefined', () => {
      SInfo.getItem.mockImplementation(() => new P((res, rej) => res(undefined)));

      return expect(secureStorage.has('pk')).resolves.toBe(false);
    });

    test('0', () => {
      SInfo.getItem.mockImplementation(() => new P((res, rej) => res(0)));

      return expect(secureStorage.has('pk')).resolves.toBe(true);
    });

    test('empty string', () => {
      SInfo.getItem.mockImplementation(() => new P((res, rej) => res('')));

      return expect(secureStorage.has('pk')).resolves.toBe(false);
    });

    test('system error', () => {
      SInfo.getItem.mockImplementation(() => new P((res, rej) => rej('I am an error message')));

      return expect(secureStorage.has('pk')).rejects.toBe('I am an error message');
    });

    test('unknown type', (done) => {
      // Test what happen's when we resolve with function
      SInfo.getItem.mockImplementation(() => new P((res, rej) => res(() => {})));

      secureStorage
        .has('pk')
        .catch((e) => {
          /**
                     * @todo report to jest team
                     * I have to put the expect in an try catch.
                     * Somehow a failed expect don't break the test
                     */
          try {
            expect(e).toBeInstanceOf(Error);
            expect(e.message).toBe('Couldn\'t handle type: \'function\'');
          } catch (e) {
            done.fail(e);
          }

          done();
        });
    });
  });

  describe('delete', () => {
    test('success', () => {
      SInfo.deleteItem.mockImplementation(() => new Promise((res, rej) => res()));

      return expect(secureStorage.remove('pk')).resolves.toBeUndefined();
    });

    test('system fail', () => {
      SInfo.deleteItem.mockImplementation(() => new Promise((res, rej) => res('Could not delete element')));

      return expect(secureStorage.remove('pk')).resolves.toBe('Could not delete element');
    });
  });

  describe('fetchItems', () => {
    test('success', () => {
      SInfo.getAllItems.mockImplementation(() => new Promise((res, rej) => res({
        key_1: 2,
        key_2: 'hi',
      })));

      return expect(secureStorage.fetchItems((key, item) => typeof item === 'string'))
        .resolves
        .toEqual({
          key_2: 'hi',
        });
    });

    test('system fail', () => {
      SInfo.getAllItems.mockImplementation(() => new Promise((res, rej) => rej('can not fatch all items')));

      return expect(secureStorage.fetchItems())
        .rejects
        .toBe('can not fatch all items');
    });
  });

  describe('destroyStorage', () => {
    test('error since not implemented', () => expect(secureStorage.destroyStorage()).rejects.toBeInstanceOf(Error));
  });
});
