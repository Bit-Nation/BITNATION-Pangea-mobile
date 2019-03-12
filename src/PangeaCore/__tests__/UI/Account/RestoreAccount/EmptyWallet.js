// @flow

import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import EmptyWallet from '../../../../UI/Account/RestoreAccount/EmptyWallet';

describe('EmptyWallet', () => {
  let emptyWalletScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
  };

  beforeEach(() => {
    emptyWalletScreen = shallow(<EmptyWallet {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(emptyWalletScreen).toMatchSnapshot();
  });
});
