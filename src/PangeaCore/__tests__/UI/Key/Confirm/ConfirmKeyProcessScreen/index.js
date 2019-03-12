import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState } from '@pangea/key/key-reducers';
import ConfirmKeyProcessScreen from '../../../../../UI/Key/Confirm/ConfirmKeyProcessScreen';
import navigatorMock from '../../../../../__mocks__/Navigator';

test('ConfirmKeyProcessScreen renders correctly', () => {
  const initialStateMock = {
    key: initialState,
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
  };

  const wrapper = shallow((
    <ConfirmKeyProcessScreen {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
