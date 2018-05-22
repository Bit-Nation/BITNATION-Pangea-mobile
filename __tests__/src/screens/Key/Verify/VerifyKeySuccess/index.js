import React from 'react';
import { shallow } from 'enzyme';

import VerifyKeySuccess from '../../../../../../src/screens/Key/Verify/VerifyKeySuccess';

test('VerifyKeySuccess renders correctly', () => {
  const propsMock = {
    navigator: {
      push: jest.fn(),
      setOnNavigatorEvent: jest.fn(),
    },
  };

  const wrapper = shallow((
    <VerifyKeySuccess {...propsMock} />
  ));
  expect(wrapper).toMatchSnapshot();
});
