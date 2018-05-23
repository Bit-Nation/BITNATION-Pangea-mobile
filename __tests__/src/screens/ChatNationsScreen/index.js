import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ChatNationsScreen from '../../../../src/screens/ChatNationsScreen';
import navigatorMock from '../../../../__mocks__/Navigator';

describe('ChatNationsScreen', () => {
  let chatScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
    onSelectTab: jest.fn(),
    openNation: jest.fn(),
    fetchNations: jest.fn(),
    startNationCreation: jest.fn(),
  };

  beforeEach(() => {
    chatScreen = shallow(<ChatNationsScreen {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(chatScreen).toMatchSnapshot();
  });

  test('requires navigator prop', () => {
    expect(chatScreen.props().navigator).toBeDefined();
  });
});
