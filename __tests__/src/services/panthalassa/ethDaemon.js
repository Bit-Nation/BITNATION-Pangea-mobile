import ethDaemonImplementation from '../../../../src/services/panthalassa/ethDaemon';
import config from 'react-native-config';

jest.mock('react-native-config', () => ({
  ETH_DAEMON_NETWORK_ID: 2,
  ETH_HTTP_ENDPOINT: 'url_from_config',
}));

describe('ethDaemon', () => {
  test('name', () => expect(ethDaemonImplementation.name).toBe('Local Ethereum node'));
  test('url', () => expect(ethDaemonImplementation.url).toBe('url_from_config'));

  test('start', done => ethDaemonImplementation
    .start()
    .then((_) => {
      expect(_).toBeUndefined();
      done();
    }));

  test('stop', done => ethDaemonImplementation.stop().then(done));
});
