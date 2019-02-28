import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState } from '../../../../../src/reducers/key';
import EnterKeyScreen from '../../../../../src/screens/Key/Enter';
import navigatorMock from '../../../../../__mocks__/Navigator';

test('EnterKeyScreen renders correctly', () => {
  const initialStateMock = {
    key: initialState,
    testingMode: { isActive: false },
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
  };

  const wrapper = shallow((
    <EnterKeyScreen {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
