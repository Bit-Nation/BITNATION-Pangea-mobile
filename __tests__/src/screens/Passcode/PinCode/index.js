import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import PinCodeScreen from '../../../../../src/screens/Passcode/PinCode';
import navigatorMock from '../../../../../__mocks__/Navigator';

describe('PinCodeScreen', () => {
  let pinCodeScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
    shouldShowCancel: false,
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    pinCodeScreen = shallow(<PinCodeScreen {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(pinCodeScreen).toMatchSnapshot();
  });
});
