import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import AccountAccessContainer from '../../../../../src/screens/Accounts/AccountAccessContainer';

describe('AccountAccessContainer', () => {
  let accountsScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn(),
      setButtons: jest.fn(),
    },
    selectedAccount: jest.fn(),
  };

  beforeEach(() => {
    accountsScreen = shallow(<AccountAccessContainer {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(accountsScreen).toMatchSnapshot();
  });

  test('requires navigator prop', () => {
    expect(accountsScreen.props().navigator).toBeDefined();
  });
});
