import React from 'react';
import { shallow } from 'enzyme';

import List from '../../../../../src/screens/WalletScreen/List';

test('List renders correctly', () => {
  const wrapper = shallow((
    <List wallets={[{
      balance: '0',
      currency: 'ETH',
      name: 'Test wallet',
      ethAddress: '0xtestAddress',
    }]}
    />
  ));
  expect(wrapper).toMatchSnapshot();
});
