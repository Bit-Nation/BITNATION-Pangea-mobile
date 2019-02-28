import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ProfileScreenContainer from '../../../../../src/screens/Settings/ProfileScreen/index';
import navigatorMock from '../../../../../__mocks__/Navigator';

describe('ProfileScreenContainer', () => {
  let profileScreenContainer;

  const initialStateMock = {
    accounts: {
      account: {
        _id: 1,
        name: 'Pangea',
        location: 'NYC',
      },
      editingAccount: {},
    },
    testingMode: {
      isActive: true,
    },
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
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
