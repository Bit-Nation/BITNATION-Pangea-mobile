import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import EmptyProfileScreen from '../../../../../../src/screens/Settings/ProfileScreen/EmptyProfile/index';
import navigatorMock from '../../../../../../__mocks__/Navigator';

describe('ProfileScreenContainer', () => {
  let emptyProfileScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
    onCreateAccountProfile: jest.fn(),
  };

  beforeEach(() => {
    emptyProfileScreen = shallow(<EmptyProfileScreen
      {...propsMock}
      store={storeMock(initialStateMock)}
    />);
  });

  test('Rendering', () => {
    expect(emptyProfileScreen).toMatchSnapshot();
  });
});
