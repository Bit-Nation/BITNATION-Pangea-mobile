import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import RestoreSource from '../../../../../src/screens/Accounts/RestoreAccount/RestoreSource';

describe('RestoreSource', () => {
  let restoreSourceScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn()
    }
  };

  beforeEach(() => {
    restoreSourceScreen = shallow(<RestoreSource {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(restoreSourceScreen).toMatchSnapshot();
  });

  test('check required props', () => {
    expect(restoreSourceScreen.props().navigator).toBeDefined();
  });
});
