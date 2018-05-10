import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import CreatePasscodeContainer from '../../../../src/screens/Passcode/CreatePasscodeContainer';

describe('CreatePasscodeContainer', () => {
  let createPasscodeContainer;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn(),
      pop: jest.fn(),
      setOnNavigatorEvent: jest.fn(),
    },
    savePinCode: jest.fn(),
    savePassword: jest.fn(),
    onSuccess: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    createPasscodeContainer = shallow(<CreatePasscodeContainer {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(createPasscodeContainer).toMatchSnapshot();
  });

  test('check required props', () => {
    expect(createPasscodeContainer.props().navigator).toBeDefined();
  });
});
