// @flow

import { call, take, fork, put } from 'redux-saga/effects';
import { eventChannel, type Channel } from 'redux-saga';

import ServiceContainer from '../../services/container';
import UpstreamService from '../../services/upstream/upstream';

import {
  panthalassaMessagePersisted
} from '../../actions/chat';

/**
 * @desc Handles UI API request.
 * @param {Object} request Request to handle
 * @return {void}
 */
export function* handleRequest(request: Object): Generator<*, *, *> {
  const { name, payload } = request;
  if (typeof name !== 'string' || typeof payload !== 'object') return;

  // @todo Remove this once request handling is implemented.
  // yield;

  // @todo Handle requests.
  switch (name) {
    case 'DAPP:PERSISTED': break;
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
  const { upstreamService } = ServiceContainer.instance;
  if (upstreamService == null) {
    return;
  }

  const channel = yield call(createUIAPIChannel, upstreamService);
  while (true) {
    const { request } = yield take(channel);
    yield fork(handleRequest, request);
  }
}
