import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState } from '../../../../../src/reducers/key';
import RestoreKeyScreen from '../../../../../src/screens/Key/Restore';

test('RestoreKeyScreen renders correctly', () => {
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
    <RestoreKeyScreen {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
