import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import NationDetailsContainer from '../../../../src/screens/NationDetailsContainer';

describe('NationDetailsContainer', () => {
  let detailScreen;

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
    navigator: {
      push: jest.fn(),
      setButtons: jest.fn(),
    },
    isDraft: false,
    onSelectTab: jest.fn(),
    joinNation: jest.fn(),
    leaveNation: jest.fn(),
    onStartNationEditing: jest.fn(),
    onDeleteDraft: jest.fn(),
    onSubmitDraft: jest.fn(),
  };

  beforeEach(() => {
    detailScreen = shallow(<NationDetailsContainer
      {...propsMock}
      store={storeMock(initialStateMock)}
    />);
  });

  test('Rendering', () => {
    expect(detailScreen).toMatchSnapshot();
  });

  test('requires navigator prop', () => {
    expect(detailScreen.props().navigator).toBeDefined();
  });
});
