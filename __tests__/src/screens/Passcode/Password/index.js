import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import PasswordScreen from '../../../../../src/screens/Passcode/Password';

describe('PasswordScreen', () => {
  let passwordScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn(),
      pop: jest.fn(),
      setOnNavigatorEvent: jest.fn(),
      setButtons: jest.fn(),
    },
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
