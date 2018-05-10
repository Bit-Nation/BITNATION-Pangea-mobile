import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SecuritySettingsScreen from '../../../../../src/screens/Settings/Security';

describe('SecuritySettingsScreen', () => {
  let securitySettingsScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn(),
      pop: jest.fn(),
      dismissAllModals: jest.fn(),
      showModal: jest.fn(),
    },
  };

  beforeEach(() => {
    securitySettingsScreen = shallow(<SecuritySettingsScreen {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(securitySettingsScreen).toMatchSnapshot();
  });

  test('check required props', () => {
    expect(securitySettingsScreen.props().navigator).toBeDefined();
  });
});
