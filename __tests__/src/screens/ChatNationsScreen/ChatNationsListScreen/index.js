import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ChatNationsListScreen from '../../../../../src/screens/ChatNationsScreen/ChatNationsListScreen';

describe('ChatNationsListScreen', () => {
  let chatListScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    onSelectItem: jest.fn(),
    selectedTab: 'ALL_NATIONS',
    nations: [],
    myNations: [],
  };

  beforeEach(() => {
    chatListScreen =
      shallow(<ChatNationsListScreen {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(chatListScreen).toMatchSnapshot();
  });
});
