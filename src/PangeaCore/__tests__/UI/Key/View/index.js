// @flow

import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState } from '@pangea/key/key-reducers';
import ViewKeyScreen from '../../../../UI/Key/View';
import navigatorMock from '../../../../__mocks__/Navigator';

test('ViewKeyScreen renders correctly', () => {
  const initialStateMock = {
    key: initialState,
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
  };

  const wrapper = shallow((
    <ViewKeyScreen {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
