import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Accounts from '../../../../src/screens/Accounts';

describe('Accounts', () => {
  let accountsScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn(),
      pop: jest.fn(),
      setOnNavigatorEvent: jest.fn()
    },
    startAccountCreation: jest.fn(),
    startRestoreAccountUsingMnemonic: jest.fn()
  };

  beforeEach(() => {
    accountsScreen = shallow(<Accounts {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(accountsScreen).toMatchSnapshot();
  });

  test('check required props', () => {
    expect(accountsScreen.props().navigator).toBeDefined();
    expect(accountsScreen.props().startAccountCreation).toBeDefined();
  });

  // test('test button behaviors', () => {
  //   const render = accountsScreen.dive();
  //   const createButton = render.find('#createButton');
  //   createButton.simulate('click');
  //   expect(propsMock.startAccountCreation).toBeCalled();
  // });
});
