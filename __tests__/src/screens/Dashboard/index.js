import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Dashboard from '../../../../src/screens/Dashboard';

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
    navigator: {
      push: jest.fn(),
    },
  };

  const wrapper = shallow((
    <Dashboard {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
