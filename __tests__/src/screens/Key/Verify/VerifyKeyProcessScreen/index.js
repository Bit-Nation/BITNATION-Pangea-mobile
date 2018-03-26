import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState as keyState } from '../../../../../../src/reducers/key';
import { initialState as testingModeState } from '../../../../../../src/reducers/testingMode';
import VerifyKeyProcessScreen from '../../../../../../src/screens/Key/Verify/VerifyKeyProcessScreen';

test('VerifyKeyProcessScreen renders correctly', () => {
  const initialStateMock = {
    key: keyState,
    testingMode: testingModeState,
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn(),
    },
  };

  const wrapper = shallow((
    <VerifyKeyProcessScreen {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
