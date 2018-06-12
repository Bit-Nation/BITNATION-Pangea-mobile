import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState } from '../../../../../../src/reducers/accounts';
import AccountAccessListScreen from '../../../../../../src/screens/Accounts/AccountAccessContainer/AccountAccessListScreen';
import navigatorMock from '../../../../../../__mocks__/Navigator';

test('AccountAccessListScreen renders correctly', () => {
  const initialStateMock = {
    key: initialState,
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
  };

  const wrapper = shallow((
    <AccountAccessListScreen {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
