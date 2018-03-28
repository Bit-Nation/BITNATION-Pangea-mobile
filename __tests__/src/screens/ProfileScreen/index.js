import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ProfileScreenContainer from '../../../../src/screens/ProfileScreen';

describe('ProfileScreenContainer', () => {
  let profileScreenContainer;

  const initialStateMock = {
    profile: {
      user: {
        _id: 1,
        name: 'Pangea',
        location: 'NYC',
      },
      editinguser: {},
    },
    testingMode: {
      isActive: true,
    },
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {},
  };

  beforeEach(() => {
    profileScreenContainer = shallow(<ProfileScreenContainer
      {...propsMock}
      store={storeMock(initialStateMock)}
    />);
  });

  test('Rendering', () => {
    expect(profileScreenContainer).toMatchSnapshot();
  });

  test('check required props', () => {
    expect(profileScreenContainer.props().navigator).toBeDefined();
  });
});
