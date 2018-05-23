import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState } from '../../../../../src/reducers/key';
import EnterKeyScreen from '../../../../../src/screens/Key/Enter';

test('EnterKeyScreen renders correctly', () => {
  const initialStateMock = {
    key: initialState,
    testingMode: { isActive: false },
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn(),
      setOnNavigatorEvent: jest.fn(),
    },
  };

  const wrapper = shallow((
    <EnterKeyScreen {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
