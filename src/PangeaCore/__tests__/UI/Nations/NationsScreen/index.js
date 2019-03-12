// @flow

import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState } from '@pangea/nations/nations-reducers';
import NationsScreen from '../../../../UI/Nations//NationsScreen';
import navigatorMock from '../../../../__mocks__/Navigator';

test('NationsScreen renders correctly', () => {
  const initialStateMock = {
    nations: initialState,
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
  };

  const wrapper = shallow((
    <NationsScreen {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
