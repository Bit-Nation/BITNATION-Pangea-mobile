import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ChatNationsScreen from '../../../../src/screens/ChatNationsScreen';

describe('ChatNationsScreen', () => {
  let chatScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn(),
      setButtons: jest.fn(),
    },
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

  test('initialization', () => {
    // @todo This won't be true, since propsMock object is not passed directly to component, but it's copy is.
    // @todo So, this function won't be called on original object.
    // @todo Probably, you can check that in beforeEach as a post-condition of initialization.
    expect(propsMock.navigator.setButtons).toBeCalled();
    expect(propsMock.fetchNations).toBeCalled();
  });
});
