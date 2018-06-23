import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SettingsListScreen from '../../../../../src/screens/Settings/SettingsList';
import navigatorMock from '../../../../../__mocks__/Navigator';

describe('SettingsListScreen', () => {
  let settingsListScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
  };

  beforeEach(() => {
    settingsListScreen = shallow(<SettingsListScreen {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(settingsListScreen).toMatchSnapshot();
  });

  test('check required props', () => {
    expect(settingsListScreen.props().navigator).toBeDefined();
  });
});
