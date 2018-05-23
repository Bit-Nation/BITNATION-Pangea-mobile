import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import EnterPasscodeContainer from '../../../../src/screens/Passcode/EnterPasscodeContainer';
import navigatorMock from '../../../../__mocks__/Navigator';

describe('EnterPasscodeContainer', () => {
  let enterPasscodeContainer;

  const initialStateMock = {
    accounts: {
      login: {
        error: 'Invalid',
      },
    },
    settings: {
      passcodeType: {
        type: 'pinCode',
        length: 6,
      },
    },
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
    checkPinCode: jest.fn(),
    checkPassword: jest.fn(),
    login: jest.fn(),
    onSuccess: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    enterPasscodeContainer = shallow(<EnterPasscodeContainer {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(enterPasscodeContainer).toMatchSnapshot();
  });

  test('check required props', () => {
    expect(enterPasscodeContainer.props().navigator).toBeDefined();
  });
});
