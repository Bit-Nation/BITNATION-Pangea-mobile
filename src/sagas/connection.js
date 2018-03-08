import { delay } from 'redux-saga';
import { call, race } from 'redux-saga/effects';
import { APP_OFFLINE, APP_ONLINE } from 'BITNATION-Pangea-libs/src/events';
import { getPangeaLibrary } from '../services/container';

let lastIsConnected = null;

// @todo Replace that with React Native NetInfo once https://github.com/facebook/react-native/issues/8615 is fixed.
export function* checkConnection() {
  const pangeaLibs = yield getPangeaLibrary();

  const { result } = yield race({
    result: call(fetch, 'https://google.com'),
    timeout: call(delay, 1000),
  });

  if (result) {
    const isConnected = result.status === 200;
    if (isConnected !== lastIsConnected) {
      lastIsConnected = isConnected;
      pangeaLibs.eventEmitter.emit(isConnected === true ? APP_ONLINE : APP_OFFLINE);
    }

    if (isConnected === true) {
      return true;
    }
  }

  throw { transKey: 'noConnection' };
}
