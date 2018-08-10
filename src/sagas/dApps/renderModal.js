import { eventChannel, type Channel } from 'redux-saga';
import { call, fork, take, select, put } from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';

import ServiceContainer from '../../services/container';
import UpstreamService from '../../services/upstream/upstream';
import type { DAppModalInfo } from '../../types/DApp';
import { storeDAppModal } from '../../actions/dApps';
import { screen } from '../../global/Screens';

/**
 * @desc Handles UI API request.
 * @param {Object} request Request to handle
 * @return {void}
 */
export function* handleRequest(request: DAppModalInfo): Generator<*, *, *> {
  const { modalID } = request;

  const { dApps: { modals } } = yield select();
  const screenRegistered = modals[modalID] != null;
  yield put(storeDAppModal(request));
  if (screenRegistered === false) {
    Navigation.showModal({
      ...screen('DAPP_MODAL_SCREEN'),
      passProps: {
        modalID,
      },
    });
  }
}

/**
 * @desc Function to create channel subscribing to modal render.
 * @param {UpstreamService} service Upstream service that will pass modal render requests.
 * @return {Channel<DAppModalInfo>} Channel that receives requests.
 */
export function createModalRenderChannel(service: UpstreamService): Channel<DAppModalInfo> {
  return eventChannel((emit) => {
    service.subscribeToModalRender((request: Object) => {
      emit({ request });
    });

    return service.unsubscribeFromModalRender;
  });
}

/**
 * @desc Subscribes to UI API and passes request to handle.
 * @return {void}
 */
export function* subscribeToModalRender(): Generator<*, *, *> {
  const { upstreamService } = ServiceContainer.instance;
  if (upstreamService == null) {
    return;
  }

  const channel = yield call(createModalRenderChannel, upstreamService);
  while (true) {
    const { request } = yield take(channel);
    yield fork(handleRequest, request);
  }
}
