import { delay } from 'redux-saga';
import { call, race } from 'redux-saga/effects';
import { APP_OFFLINE, APP_ONLINE } from 'BITNATION-Pangea-libs/src/events';
import { getPangeaLibrary } from '../services/container';

let lastIsConnected = false;

export function* checkConnection() {
  const pangeaLibs = yield getPangeaLibrary();

  const { result } = yield race({
    result: call(fetch, 'https://google.com'),
    timeout: call(delay, 1000),
  });

  if (result) {
    const isConnected = result === 200;
    if (isConnected !== lastIsConnected) {
      lastIsConnected = isConnected;
      if (isConnected === false) {
        pangeaLibs.eventEmitter.emit(APP_OFFLINE);
        return;
      }

      pangeaLibs.eventEmitter.emit(APP_ONLINE);
    }
    return isConnected;
  }

  throw { transKey: 'noConnection' };
}
