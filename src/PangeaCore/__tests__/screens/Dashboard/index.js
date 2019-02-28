import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Dashboard from '../../../../src/screens/Dashboard';
import navigatorMock from '../../../../__mocks__/Navigator';

test('Dashboard renders correctly', () => {
  const initialStateMock = {
    nations: {
      nations: [{
        id: 1,
        idInSmartContract: 1,
      }],
    },
    activity: {
      messages: [],
    },
    testingMode: {
      isActive: false,
    },
    wallet: {
      wallets: [],
    },
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
  };

  const wrapper = shallow((
    <Dashboard {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
