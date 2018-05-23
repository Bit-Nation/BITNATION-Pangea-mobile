import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState } from '../../../../../../src/reducers/key';
import ConfirmKeyInstructionScreen from '../../../../../../src/screens/Key/Confirm/ConfirmKeyInstructionScreen';
import navigatorMock from '../../../../../../__mocks__/Navigator';

test('ConfirmKeyInstructionScreen renders correctly', () => {
  const initialStateMock = {
    key: initialState,
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
  };

  const wrapper = shallow((
    <ConfirmKeyInstructionScreen {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
