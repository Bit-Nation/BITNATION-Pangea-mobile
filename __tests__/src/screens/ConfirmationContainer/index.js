import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ConfirmationContainer from '../../../../src/screens/ConfirmationContainer';

describe('ConfirmationContainer', () => {
  let createScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn(),
      setButtons: jest.fn(),
    },
    onSuccess: jest.fn(),
    onFail: jest.fn(),
  };

  beforeEach(() => {
    createScreen = shallow(<ConfirmationContainer
      {...propsMock}
      store={storeMock(initialStateMock)}
    />);
  });

  test('Rendering', () => {
    expect(createScreen).toMatchSnapshot();
  });

  test('requires navigator prop', () => {
    expect(createScreen.props().navigator).toBeDefined();
  });
});