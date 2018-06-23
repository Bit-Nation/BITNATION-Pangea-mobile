import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SecuritySettingsScreen from '../../../../../src/screens/Settings/Security';
import navigatorMock from '../../../../../__mocks__/Navigator';

describe('SecuritySettingsScreen', () => {
  let securitySettingsScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
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
