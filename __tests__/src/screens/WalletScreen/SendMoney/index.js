import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SendMoney from '../../../../../src/screens/WalletScreen/SendMoney';
import { initialState } from '../../../../../src/reducers/wallet';
import navigatorMock from '../../../../../__mocks__/Navigator';

test('SendMoney renders correctly', () => {
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
  };
  const initialStateMock = {
    wallet: {
      ...initialState,
      wallets: [{
        balance: '0',
        currency: 'ETH',
        ethAddress: '0xtestAddress',
      }],
      moneySendingError: null,
      moneySendingInProgress: false,
    },
    testingMode: {
      isActive: false,
    },
  };

  const wrapper = shallow((
    <SendMoney {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
