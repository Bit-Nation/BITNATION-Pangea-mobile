import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import NationCreateContainer from '../../../../src/screens/NationCreateContainer';

describe('NationCreateContainer', () => {
  let createScreen;

  const initialStateMock = {};
  const storeMock = configureStore([]);
  const propsMock = {
    navigator: {
      push: jest.fn(),
      setButtons: jest.fn(),
    },
    onSaveNationDraft: jest.fn(),
    onResetNationCreation: jest.fn(),
    onDeleteNationDraft: jest.fn(),
    onSubmitNation: jest.fn(),
    onNationChange: jest.fn(),
  };

  beforeEach(() => {
    createScreen = shallow(<NationCreateContainer
      {...propsMock}
      store={storeMock(initialStateMock)}
    />);
  });

  test('Rendering', () => {
    expect(createScreen).toMatchSnapshot();
  });

  test('requires navigator prop', () => {
    expect(createScreen.props().navigator).toBeDefined();
  });
});
