import reducer, { emptyNation, initialState } from '../../../src/reducers/modifyNation';
import {
  cancelNationCreation, deleteNationDraft,
  editingNationFieldChange, nationDraftDeleteResult, nationDraftSaveResult, nationSubmitResult, resetNationCreation,
  saveNationDraft,
  startNationCreation,
  startNationEditing, submitNation,
} from '../../../src/actions/modifyNation';

describe('modify nation reducer action handling', () => {
  const mockNation = {
    id: '12345',
    name: 'Mock nation',
  };

  const mockError = {
    error: 'ERROR',
  };

  test('startNationCreation', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(initialState, startNationCreation());
    expect(stateAfter).toEqual({
      ...stateBefore,
      initialNation: emptyNation,
      editingNation: emptyNation,
    });
  });

  test('startNationEditing', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(initialState, startNationEditing(mockNation));
    expect(stateAfter).toEqual({
      ...stateBefore,
      initialNation: mockNation,
      editingNation: mockNation,
    });
  });

  test('resetNationCreation', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(initialState, resetNationCreation());
    expect(stateAfter).toEqual({
      ...stateBefore,
      editingNation: stateBefore.initialNation,
    });
  });

  test('editingNationFieldChange', () => {
    const value = 'NEW NAME';

    const stateBefore = initialState;
    const stateAfter = reducer(initialState, editingNationFieldChange('name', value));
    expect(stateAfter).toEqual({
      ...stateBefore,
      editingNation: {
        ...stateBefore.editingNation,
        name: value,
      },
    });
  });

  test('cancelNationCreation', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(initialState, cancelNationCreation());
    expect(stateAfter).toEqual({
      ...stateBefore,
      editingNation: null,
      initialNation: null,
    });
  });

  test('saveNationDraft', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(initialState, saveNationDraft());
    expect(stateAfter).toEqual({
      ...stateBefore,
      inProgress: true,
    });
  });

  test('deleteNationDraft', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(initialState, deleteNationDraft());
    expect(stateAfter).toEqual({
      ...stateBefore,
      inProgress: true,
    });
  });

  test('submitNation', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(initialState, submitNation());
    expect(stateAfter).toEqual({
      ...stateBefore,
      inProgress: true,
    });
  });

  test('nationDraftSaveResult', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(initialState, nationDraftSaveResult(undefined, mockError));
    expect(stateAfter).toEqual({
      ...stateBefore,
      inProgress: false,
      latestError: mockError,
    });
  });

  test('nationDraftDeleteResult', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(initialState, nationDraftDeleteResult(undefined, mockError));
    expect(stateAfter).toEqual({
      ...stateBefore,
      inProgress: false,
      latestError: mockError,
    });
  });

  test('nationSubmitResult', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(initialState, nationSubmitResult(undefined, mockError));
    expect(stateAfter).toEqual({
      ...stateBefore,
      inProgress: false,
      latestError: mockError,
    });
  });
});
