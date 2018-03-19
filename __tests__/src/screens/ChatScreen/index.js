import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ChatScreen from '../../../../src/screens/ChatScreen';

describe('ChatNationsScreen', () => {
  let chatScreen;

  const initialStateMock = {
    nations: {
      nations: [{
        _id: 1,
        idInSmartContract: 1
      }],
      openedNationId: 1
    },
    profile: {
      user: {},
    },
    chat: {
      isFetching: true
    },
  };
  const storeMock = configureStore([]);
  const propsMock = {
    isBot: false,
    // showSpinner: jest.fn(),
    // hideSpinner: jest.fn(),
  };

  beforeEach(() => {
    chatScreen = shallow(<ChatScreen {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(chatScreen).toMatchSnapshot();
  });

  test('check required props', () => {
    expect(chatScreen.props().nationId).toBeDefined();
    expect(chatScreen.props().isBot).toBeDefined();
  });
});
