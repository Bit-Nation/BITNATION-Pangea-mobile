import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ProfileScreen from '../../../../../src/screens/ProfileScreen/Profile';

describe('ProfileScreenContainer', () => {
  let profileScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      setButtons: jest.fn(),
      setOnNavigatorEvent: jest.fn(),
    },
    user: {
      _id: 1,
      name: 'Pangea',
      location: 'NYC',
      avatar: null,
    },
  };

  beforeEach(() => {
    profileScreen = shallow(<ProfileScreen
      {...propsMock}
      store={storeMock(initialStateMock)}
    />);
  });

  test('Rendering', () => {
    expect(profileScreen).toMatchSnapshot();
  });
});
