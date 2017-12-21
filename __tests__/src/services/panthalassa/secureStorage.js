import secureStorage from '../../../../src/services/panthalassa/secureStorage';

describe('secureStorage', () => {

    describe('set', () => {

        test('should return a void promise when set is successfully', () => {

            //mock of react-native-sensitive-info
            const si = {
                set: jest.fn((key, value) => {

                    expect(key).toBe('private_eth_key');
                    expect(value).toBe('0x....');

                    return new Promise((res, rej) => res('0x....'));

                })
            };

            const ss = secureStorage(si);

            return expect(ss.set('private_eth_key', '0x....')).resolves.toBeUndefined();

        });

        test('should reject on error in react-native-sensitive-info', () => {

            const error = {};

            //mock of react-native-sensitive-info
            const si = {
                set: jest.fn(() => {

                    return new Promise((res, rej) => rej(error));

                })
            };

            const ss = secureStorage(si);

            return expect(ss.set('', '')).resolves.toBe(error);

        })

    });

    describe('get', () => {

        test('fetch item successfully', () => {

            //mock of react-native-sensitive-info
            const si = {
                get: jest.fn((key) => {

                    expect(key).toBe('private_eth_key');

                    return new Promise((res, rej) => res('0x....'));

                })
            };

            const ss = secureStorage(si);

            return expect(ss.get('private_eth_key')).resolves.toBe('0x....');

        });

        test('should reject on error in get of react-native-sensitive-info', () => {

            const error = {};

            //mock of react-native-sensitive-info
            const si = {
                get: jest.fn(() => {

                    return new Promise((res, rej) => rej(error));

                })
            };

            const ss = secureStorage(si);

            return expect(ss.get('private_eth_key')).rejects.toBe(error);

        });

    });

});
