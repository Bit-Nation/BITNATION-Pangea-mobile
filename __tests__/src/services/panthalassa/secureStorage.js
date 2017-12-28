import secureStorage from '../../../../src/services/panthalassa/secureStorage';
import SInfo from 'react-native-sensitive-info';

//Mock react native sensetive information
jest.mock('react-native-sensitive-info', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    getAllItems: jest.fn()
}));

describe('secureStorage', () => {

    describe('set', () => {

        test('should return a void promise when set is successfully', () => {

            //Mock setItem
            SInfo.setItem.mockImplementation((key, value) => {
                expect(key).toBe('private_eth_key');
                expect(value).toBe('0x....');

                return new Promise((res, rej) => res('0x....'));
            });

            return expect(secureStorage.set('private_eth_key', '0x....')).resolves.toBeUndefined();

        });

        test('should reject when os fail to save', () => {

            //Mock set Item to rej
            SInfo.setItem.mockImplementation(() => new Promise((res, rej) => rej("I am an error")));

            return expect(secureStorage.set('my_key', 'my_password')).rejects.toBe('I am an error');

        })

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

});
