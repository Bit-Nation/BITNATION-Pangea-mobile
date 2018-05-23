import React from 'react';
import { shallow } from 'enzyme';

import VerifyKeySuccess from '../../../../../../src/screens/Key/Verify/VerifyKeySuccess';
import navigatorMock from '../../../../../../__mocks__/Navigator';

test('VerifyKeySuccess renders correctly', () => {
  const propsMock = {
    navigator: navigatorMock,
  };

  const wrapper = shallow((
    <VerifyKeySuccess {...propsMock} />
  ));
  expect(wrapper).toMatchSnapshot();
});
