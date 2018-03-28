import React from 'react';
import { shallow } from 'enzyme';

import WalletPanel from '../../../../../src/screens/Dashboard/WalletPanel';

test('WalletPanel renders correctly', () => {
  const wrapper = shallow((
    <WalletPanel
      wallets={[]}
    />
  ));
  expect(wrapper).toMatchSnapshot();
});
