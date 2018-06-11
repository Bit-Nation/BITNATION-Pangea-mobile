import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import CreatePasscodeContainer from '../../../../src/screens/Passcode/CreatePasscodeContainer';
import navigatorMock from '../../../../__mocks__/Navigator';

describe('CreatePasscodeContainer', () => {
  let createPasscodeContainer;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
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
