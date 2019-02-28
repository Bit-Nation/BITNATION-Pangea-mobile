import { select, call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { onCurrentAccountChange } from '../../../../src/sagas/serviceContainer/sagas';
import { buildEmptyAccount } from '../../../../src/reducers/accounts';
import ServiceContainer from '../../../../src/services/container';
import AccountsService from '../../../../src/services/accounts';
import { servicesCreated, servicesDestroyed } from '../../../../src/actions/serviceContainer';

describe('onCurrentAccountChange', () => {
  const gen = cloneableGenerator(onCurrentAccountChange)();

  expect(gen.next().value).toEqual(select());

  test('currentAccount is null', () => {
    const mockAccounts = {
      currentAccountId: null,
    };
    const clone = gen.clone();
    expect(clone.next({ accounts: mockAccounts }).value)
      .toEqual(call([ServiceContainer.instance, 'destroyServices']));
    expect(clone.next().value)
      .toEqual(put(servicesDestroyed()));

    expect(clone.next().value).toBeUndefined();
    expect(clone.next().done).toBeTruthy();
  });

  test('currentAccountId is not null', () => {
    const mockAccount = {
      ...buildEmptyAccount(),
    };
    const mockAccounts = {
      currentAccountId: mockAccount.id,
      accounts: [mockAccount],
    };
    const privateKeyMock = '0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160';
    const clone = gen.clone();
    expect(clone.next({ accounts: mockAccounts }).value)
      .toEqual(call(AccountsService.getEthPrivateKey));
    expect(clone.next(privateKeyMock).value)
      .toEqual(call([ServiceContainer.instance, 'initServices'], mockAccount, privateKeyMock));
    expect(clone.next().value)
      .toEqual(put(servicesCreated()));
    expect(clone.next().done).toBeTruthy();
  });
});
