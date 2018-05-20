import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import DeveloperSettings from '../../../../../src/screens/Accounts/CreateAccount/DeveloperSettings';

describe('DeveloperSettings', () => {
  let developerSettingsScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn(),
      pop: jest.fn(),
    },
    creatingAccount: {
      id: 1,
      networkType: 'main',
    },
    changeCreatingAccount: jest.fn(),
  };

  beforeEach(() => {
    developerSettingsScreen = shallow(<DeveloperSettings {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(developerSettingsScreen).toMatchSnapshot();
  });

  test('check required props', () => {
    expect(developerSettingsScreen.props().navigator).toBeDefined();
  });
});
