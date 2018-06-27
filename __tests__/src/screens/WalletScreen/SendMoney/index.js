import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SendMoney from '../../../../../src/screens/WalletScreen/SendMoney';
import { initialState } from '../../../../../src/reducers/wallet';
import navigatorMock from '../../../../../__mocks__/Navigator';

describe('SendMoney Screen', () => {
  let sendMoneyScreen;

  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
    onSendMoney: jest.fn(),
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
  beforeEach(() => {
    sendMoneyScreen = shallow((
      <SendMoney {...propsMock} store={storeMock(initialStateMock)}/>
    ));
  });
  test('SendMoney renders correctly', () => {
    expect(sendMoneyScreen).toMatchSnapshot();
  });

  test('SendMoney requires navigator prop', () => {
    expect(sendMoneyScreen.props().navigator).toBeDefined();
  });
});
