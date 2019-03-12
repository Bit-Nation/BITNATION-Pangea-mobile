import React from 'react';
import { shallow } from 'enzyme';

import ActivityPanel from '../../../../UI/Dashboard/ActivityPanel';

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
