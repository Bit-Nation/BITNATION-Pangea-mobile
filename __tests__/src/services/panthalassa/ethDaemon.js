import ethDaemonImplementation from '../../../../src/services/panthalassa/ethDaemon'
import config from 'react-native-config';
import ethDaemon from 'react-native-eth-daemon';

jest.mock('react-native-eth-daemon', () => ({
    startDaemon: jest.fn(),
    stopDaemon: jest.fn()
}));

jest.mock('react-native-config', () => ({
    ETH_DAEMON_NETWORK_ID: 2
}));

describe('ethDaemon', () => {

    test('name', () => expect(ethDaemonImplementation.name).toBe('Local Ethereum node'));
    test('url', () => expect(ethDaemonImplementation.url).toBe('localhost:8545'));

    test('start', () => {

        ethDaemon.startDaemon.mockImplementation(() => new Promise((res, rej) => res()));

        return ethDaemonImplementation
            .start()
            .then(_ => {

                expect(ethDaemon.startDaemon).toHaveBeenCalledWith({
                    enabledEthereum:true,
                    networkID: 2,
                    enodesNumber:16,
                    maxPeers:25,
                    enabledWhisper:false
                })

            })

    });

    test('stop', (done) => {

        ethDaemon.stopDaemon.mockImplementation(() => new Promise((res, rej) => res()));

        return ethDaemonImplementation.stop().then(done)

    })

});