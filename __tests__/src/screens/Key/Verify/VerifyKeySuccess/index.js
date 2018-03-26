import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState } from '../../../../../../src/reducers/key';
import VerifyKeySuccess from '../../../../../../src/screens/Key/Verify/VerifyKeySuccess';

test('VerifyKeySuccess renders correctly', () => {
  const initialStateMock = {
    key: initialState,
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn(),
    },
  };

  const wrapper = shallow((
    <VerifyKeySuccess {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
