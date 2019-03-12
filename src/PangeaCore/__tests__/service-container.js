// @flow

import { ServiceContainer } from 'pangea-common/service-container';
import type { Account } from 'pangea-common/types/accounts-types';
import { buildEmptyAccount } from '@pangea/accounts/accounts-reducers';

import { EthereumService } from '@pangea/ethereum';
import { WalletService } from '@pangea/wallet/wallet-service';
import { PangeaLoader } from "../PangeaLoader";

jest.mock('reconnecting-websocket');
jest.mock('NativeModules', () => ({
  Panthalassa: {
    PanthalassaSendResponse: jest.fn(),
  },
}));
jest.mock('NativeEventEmitter', () => function () {
  return { addListener: jest.fn() };
});

const accountMock: Account = ({
  ...buildEmptyAccount(),
  name: 'NAME',
  accountStore: 'ACCOUNT_STORE',
}: any);

test('initServices', () => {
  PangeaLoader.instance.initServices(accountMock, '0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
  expect(ServiceContainer.instance.getService('ethereum')).toBeInstanceOf(EthereumService);
  expect(ServiceContainer.instance.getService('wallet')).toBeInstanceOf(WalletService);
  // Since we know that wallet service is not null, we don't need to check it again.
  // $FlowFixMe
  let walletServ: WalletService = ServiceContainer.instance.getService('wallet');
  expect(walletServ.ethereumService)
    .toEqual(ServiceContainer.instance.getService('ethereum'));
});

test('destroyServices', () => {
  PangeaLoader.instance.initServices(accountMock, '0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
  ServiceContainer.instance.destroyServices();
  expect(ServiceContainer.instance.getService('ethereum')).toBeNull();
  expect(ServiceContainer.instance.getService('wallet')).toBeNull();
});
