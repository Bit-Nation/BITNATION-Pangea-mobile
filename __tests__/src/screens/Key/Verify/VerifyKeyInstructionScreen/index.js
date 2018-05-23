import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState } from '../../../../../../src/reducers/key';
import VerifyKeyInstructionScreen from '../../../../../../src/screens/Key/Verify/VerifyKeyInstructionScreen';
import navigatorMock from '../../../../../../__mocks__/Navigator';

test('VerifyKeyInstructionScreen renders correctly', () => {
  const initialStateMock = {
    key: initialState,
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
  };

  const wrapper = shallow((
    <VerifyKeyInstructionScreen {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
