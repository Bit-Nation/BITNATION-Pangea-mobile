import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import EmptyProfileScreen from '../../../../../src/screens/ProfileScreen/EmptyProfile';

describe('ProfileScreenContainer', () => {
  let emptyProfileScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      setButtons: jest.fn(),
      setOnNavigatorEvent: jest.fn(),
    },
    onCreateUserProfile: jest.fn(),
  };

  beforeEach(() => {
    emptyProfileScreen = shallow(<EmptyProfileScreen
      {...propsMock}
      store={storeMock(initialStateMock)}
    />);
  });

  test('Rendering', () => {
    expect(emptyProfileScreen).toMatchSnapshot();
  });
});
