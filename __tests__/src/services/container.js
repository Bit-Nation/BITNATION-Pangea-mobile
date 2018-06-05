// @flow

import ServiceContainer from '../../../src/services/container';
import { buildEmptyAccount } from '../../../src/reducers/accounts';
import type { Account } from '../../../src/types/Account';
import EthereumService from '../../../src/services/ethereum';
import WalletService from '../../../src/services/wallet';

const accountMock: Account = ({
  ...buildEmptyAccount(),
  name: 'NAME',
  accountStore: 'ACCOUNT_STORE',
}: any);

test('initServices', () => {
  ServiceContainer.instance.initServices(accountMock, '0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
  expect(ServiceContainer.instance.ethereumService).toBeInstanceOf(EthereumService);
  expect(ServiceContainer.instance.walletService).toBeInstanceOf(WalletService);
  // Since we know that wallet service is not null, we don't need to check it again.
  // $FlowFixMe
  expect(ServiceContainer.instance.walletService.ethereumService)
    .toEqual(ServiceContainer.instance.ethereumService);
});

test('destroyServices', () => {
  ServiceContainer.instance.initServices(accountMock, '0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
  ServiceContainer.instance.destroyServices();
  expect(ServiceContainer.instance.ethereumService).toBeNull();
  expect(ServiceContainer.instance.walletService).toBeNull();
});
