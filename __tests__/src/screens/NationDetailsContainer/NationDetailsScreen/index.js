import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import NationDetailsScreen from '../../../../../src/screens/NationDetailsContainer/NationDetailsScreen';
import navigatorMock from '../../../../../__mocks__/Navigator';

describe('DetailNationScreen', () => {
  let detailsScreen;

  const initialStateMock = {
    nations: {
      nations: [{
        id: 1,
        idInSmartContract: 1,
      }],
      openedNationId: 1,
    },
  };
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: navigatorMock,
    isDraft: false,
    joinNation: jest.fn(),
    leaveNation: jest.fn(),
    deleteDraft: jest.fn(),
    submitDraft: jest.fn(),
    openNationChat: jest.fn(),
  };

  beforeEach(() => {
    detailsScreen = shallow(<NationDetailsScreen
      {...propsMock}
      store={storeMock(initialStateMock)}
    />);
  });

  test('Rendering', () => {
    expect(detailsScreen).toMatchSnapshot();
  });
});
