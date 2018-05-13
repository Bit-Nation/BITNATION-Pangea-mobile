import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import EnterPasscodeContainer from '../../../../src/screens/Passcode/EnterPasscodeContainer';

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
    navigator: {
      push: jest.fn(),
      pop: jest.fn(),
      setOnNavigatorEvent: jest.fn(),
    },
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
