import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import ChatNationsScreen from '../../../../src/screens/ChatNationsScreen';

describe('ChatNationsScreen', () => {

  let chatScreen;
  const propsMock = {
    navigator: {
      push: jest.fn(),
      setButtons: jest.fn()
    },
    onSelectTab: jest.fn(),
    openNation: jest.fn(),
    fetchNations: jest.fn(),
    startNationCreation: jest.fn()
  };

  beforeEach(() => {
    chatScreen = shallow(<ChatNationsScreen {...propsMock} />);
  });

  test('Rendering', () => {
    expect(chatScreen).toMatchSnapshot();
  });

  test('requires navigator prop', () => {
    expect(chatScreen.props().navigator).toBeDefined();
  });

  test('initialization', () => {
    expect(propsMock.navigator.setButtons).toBeCalled();
    expect(propsMock.fetchNations).toBeCalled();
  });
});
