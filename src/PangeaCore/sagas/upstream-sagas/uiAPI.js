// @flow

import { call, take, fork, put } from 'redux-saga/effects';
import { eventChannel, type Channel } from 'redux-saga';

import { ServiceContainer } from 'pangea-common/service-container';
import { UpstreamService } from '@pangea/dapps/upstream-services/upstream';
import { stopDApp } from '@pangea/dApps/dApps-actions';
import { fetchDApps, stopDAppSaga } from '@pangea/dApps/dapps-sagas/sagas';

import { panthalassaMessagePersisted } from '@pangea/chat/chat-actions';

/**
 * @desc Handles UI API request.
 * @param {Object} request Request to handle
 * @return {void}
 */
export function* handleRequest(request: Object): Generator<*, *, *> {
  const { name, payload } = request;
  if (typeof name !== 'string' || typeof payload !== 'object') return;

  // @todo Handle requests.
  switch (name) {
    case 'DAPP:PERSISTED': {
      const { dapp_signing_key: publicKey } = payload;
      yield call(stopDAppSaga, stopDApp(publicKey));
      yield call(fetchDApps);
      break;
    }
    case 'MESSAGE:RECEIVED': break;
    case 'MESSAGE:DELIVERED': break;
    case 'MESSAGE:PERSISTED':
      yield put(panthalassaMessagePersisted(payload));
      break;
    default: break;
  }
}

/**
 * @desc Function to create channel subscribing to UI API.
 * @param {UpstreamService} service Upstream service that will pass UI API requests.
 * @return {Channel<Object>} Channel that receives requests.
 */
export function createUIAPIChannel(service: UpstreamService): Channel<Object> {
  return eventChannel((emit) => {
    service.subscribeToUIAPI((request: Object) => {
      emit({ request });
    });

    return service.unsubscribeFromUIAPI;
  });
}

/**
 * @desc Subscribes to UI API and passes request to handle.
 * @return {void}
 */
export function* subscribeToUIAPI(): Generator<*, *, *> {
  const upstreamService = ServiceContainer.instance.getService("upstream");
  if (upstreamService == null) {
    return;
  }

  const channel = yield call(createUIAPIChannel, upstreamService);
  while (true) {
    const { request } = yield take(channel);
    yield fork(handleRequest, request);
  }
}
