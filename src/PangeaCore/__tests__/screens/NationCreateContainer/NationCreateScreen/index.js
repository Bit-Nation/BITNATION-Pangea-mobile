import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import CreateNation from '../../../../../src/screens/NationCreateContainer/NationCreateScreen';

describe('CreateNation', () => {
  let createScreen;

  const initialStateMock = {
    initialNation: {
      id: 1,
      nationName: '',
      nationDescription: '',
      exists: false,
      virtualNation: null,
      nationCode: '',
      nationCodeLink: '',
      lawEnforcementMechanism: '',
      profit: false,
      decisionMakingProcess: '',
      diplomaticRecognition: false,
      governanceService: [],
      nonCitizenUse: false,
    },
    editingNation: {},
  };
  const storeMock = configureStore([]);
  const propsMock = {
    initialNation: null,
    editingNation: {
      id: 1,
      nationName: '',
      nationDescription: '',
      exists: false,
      virtualNation: null,
      nationCode: '',
      nationCodeLink: '',
      lawEnforcementMechanism: '',
      profit: false,
      decisionMakingProcess: '',
      diplomaticRecognition: false,
      governanceService: [],
      nonCitizenUse: false,
    },
    onCancelNationCreation: jest.fn(),
    onResetNationCreation: jest.fn(),
    onDeleteNationDraft: jest.fn(),
    onSubmitNation: jest.fn(),
    onNationChange: jest.fn(),
    onSaveNationDraft: jest.fn(),
  };

  beforeEach(() => {
    createScreen = shallow(<CreateNation
      {...propsMock}
      store={storeMock(initialStateMock)}
    />);
  });

  test('Rendering', () => {
    expect(createScreen).toMatchSnapshot();
  });
});
