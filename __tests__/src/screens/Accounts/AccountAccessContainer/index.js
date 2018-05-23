import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import AccountAccessContainer from '../../../../../src/screens/Accounts/AccountAccessContainer';
import navigatorMock from '../../../../../__mocks__/Navigator';

describe('AccountAccessContainer', () => {
  let accountsScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
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
