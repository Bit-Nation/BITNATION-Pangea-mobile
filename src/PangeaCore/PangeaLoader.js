// @flow

import { createStore, applyMiddleware, compose, type Store } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createSagaMonitor from '@clarketm/saga-monitor';
import reducers from './reducers';
import rootSaga from './sagas';

import type { Account } from 'pangea-common/types/accounts-types';
import { normalizeHexValue } from '@pangea/key/key-utils';
import defaultDB from '@pangea/database';
import EthereumServiceFactory from '@pangea/ethereum/factory';
import { EthereumService } from '@pangea/ethereum';
import { WalletService } from '@pangea/wallet/wallet-service';
import { NationsService } from '@pangea/nations/nations-service';
import { UpstreamService } from '@pangea/dapps/upstream-services/upstream';
import { PangeaService } from "pangea-common/service-container";
import { ServiceContainer } from 'pangea-common/service-container';
/**
 * @desc Configures a Redux store.
 * @return {Store} Created store object.
 */
export function configureStore(): Store {
  const sagaMonitor = createSagaMonitor({
    level: 'log',
    actionDispatch: true,
  });
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(logger),
  );

  const store = createStore(reducers, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}


export class PangeaLoader {
  static instance: PangeaLoader = new PangeaLoader();
  
  initServices(account: Account, ethPrivateKey: string) {
    let serviceFactory = () => {
      let services: Map<string, PangeaService> = new Map();
      
      let eth = EthereumServiceFactory({
        privateKey: normalizeHexValue(ethPrivateKey),
        networkType: account.networkType,
        app: 'Default Application',
      });

      services.set("ethereum", eth.service);
      services.set("wallet", new WalletService(eth.service));
      services.set("nations", new NationsService(eth.service, defaultDB, account.id));
      services.set("upstream", new UpstreamService(eth.service));
      return services;
    }
    ServiceContainer.instance.initServices(serviceFactory);
  }
}