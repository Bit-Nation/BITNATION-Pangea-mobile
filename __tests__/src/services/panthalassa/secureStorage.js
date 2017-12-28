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

});
