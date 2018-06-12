import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import PasswordScreen from '../../../../../src/screens/Passcode/Password';
import navigatorMock from '../../../../../__mocks__/Navigator';

describe('PasswordScreen', () => {
  let passwordScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
    shouldShowCancel: false,
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    passwordScreen = shallow(<PasswordScreen {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(passwordScreen).toMatchSnapshot();
  });
});
