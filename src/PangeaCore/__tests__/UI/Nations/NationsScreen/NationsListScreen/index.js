import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { initialState } from '@pangea/nations/nations-reducers';
import NationListScreen from '../../../../../UI/Nations/NationsScreen/NationsListScreen';
import navigatorMock from '../../../../../__mocks__/Navigator';

test('NationListScreen renders correctly', () => {
  const initialStateMock = {
    key: initialState,
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
  };

  const wrapper = shallow((
    <NationListScreen {...propsMock} store={storeMock(initialStateMock)} />
  ));
  expect(wrapper).toMatchSnapshot();
});
