import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ReceiveMoney from '../../../../../src/screens/WalletScreen/ReceiveMoney';
import { initialState } from '../../../../../src/reducers/wallet';
import navigatorMock from '../../../../../__mocks__/Navigator';

test('ReceiveMoney renders correctly', () => {
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
    },
    testingMode: {
      isActive: false,
    },
  };

  const wrapper = shallow((
    <ReceiveMoney {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
