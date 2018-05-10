import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import CreateReady from '../../../../../src/screens/Accounts/CreateAccount/CreateReady';

describe('CreateReady', () => {
  let createReadyScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    creatingAccount: {
      id: 1
    },
    saveSettings: jest.fn(),
    performDeferredLogin: jest.fn()
  };

  beforeEach(() => {
    createReadyScreen = shallow(<CreateReady {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(createReadyScreen).toMatchSnapshot();
  });
});
