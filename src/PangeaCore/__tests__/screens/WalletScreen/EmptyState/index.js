import React from 'react';
import { shallow } from 'enzyme';

import EmptyState from '../../../../../src/screens/WalletScreen/EmptyState';

test('EmptyState renders correctly', () => {
  const wrapper = shallow((
    <EmptyState />
  ));
  expect(wrapper).toMatchSnapshot();
});
