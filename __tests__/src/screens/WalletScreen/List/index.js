import React from 'react';
import { shallow } from 'enzyme';

import List from '../../../../../src/screens/WalletScreen/List';

describe('List Wallet', () => {
  let ListScreen;
  const propsMock = {
    wallets: [{
      balance: '0',
      currency: 'ETH',
      ethAddress: '0xtestAddress',
    }],
    onReceivePress: jest.fn(),
    onSendPress: jest.fn(),
    isRefreshing: jest.fn(),
    onRefresh: jest.fn(),
  };
  test('List renders correctly', () => {
    ListScreen = shallow((
      <List {...propsMock} />
    ));
    expect(ListScreen).toMatchSnapshot();
  });
});
