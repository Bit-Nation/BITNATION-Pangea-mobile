import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState } from '../../../../../src/reducers/key';
import ViewKeyScreen from '../../../../../src/screens/Key/View';

test('ViewKeyScreen renders correctly', () => {
  const initialStateMock = {
    key: initialState,
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn(),
      setOnNavigatorEvent: jest.fn(),
    },
  };

  const wrapper = shallow((
    <ViewKeyScreen {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
