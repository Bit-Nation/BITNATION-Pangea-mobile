// @flow

import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState } from '@pangea/wallet/wallet-reducers';
import WalletScreen from '../../../../UI/Wallet/WalletScreen';
import navigatorMock from '../../../../__mocks__/Navigator';

describe('WalletScreen renders correctly', () => {
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
  };

  test('empty', () => {
    const initialStateMock = {
      wallet: initialState,
      testingMode: {
        isActive: false,
      },
      accounts: {
        user: {},
      },
    };

    const wrapper = shallow((
      <WalletScreen {...propsMock} store={storeMock(initialStateMock)} />
    ));
    expect(wrapper).toMatchSnapshot();
  });

  test('non-empty', () => {
    const initialStateMock = {
      wallet: {
        ...initialState,
        wallets: [{
          balance: '0',
          currency: 'ETH',
          ethAddress: '0xtestAddress',
        }],
      },
      testingMode: {
        isActive: false,
      },
      accounts: {
        user: {},
      },
    };

    const wrapper = shallow((
      <WalletScreen {...propsMock} store={storeMock(initialStateMock)} />
    ));
    expect(wrapper).toMatchSnapshot();
  });
});
