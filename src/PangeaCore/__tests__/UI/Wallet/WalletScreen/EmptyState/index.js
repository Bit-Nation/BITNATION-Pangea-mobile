import React from 'react';
import { shallow } from 'enzyme';

import EmptyState from '../../../../../UI/Wallet/WalletScreen/EmptyState';

test('EmptyState renders correctly', () => {
  const wrapper = shallow((
    <EmptyState />
  ));
  expect(wrapper).toMatchSnapshot();
});
