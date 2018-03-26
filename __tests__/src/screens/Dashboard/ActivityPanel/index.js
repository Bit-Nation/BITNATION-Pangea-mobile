import React from 'react';
import { shallow } from 'enzyme';

import ActivityPanel from '../../../../../src/screens/Dashboard/ActivityPanel';

test('ActivityPanel renders correctly', () => {
  const wrapper = shallow((
    <ActivityPanel
      messages={[]}
      testingMode={{ isActive: true }}
      onAddDummyMessage={jest.fn()}
    />
  ));
  expect(wrapper).toMatchSnapshot();
});
