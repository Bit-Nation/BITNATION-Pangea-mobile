import {
  CANCEL_NATION_CREATE,
  DELETE_NATION_DRAFT,
  EDITING_NATION_FIELD_CHANGE,
  NATION_DRAFT_DELETE_FINISHED,
  NATION_DRAFT_SAVE_FINISHED,
  NATION_SUBMIT_FINISHED,
  RESET_NATION_CREATION,
  SAVE_NATION_DRAFT,
  START_NATION_CREATION,
  START_NATION_EDITING,
  SUBMIT_NATION,
  cancelNationCreation,
  deleteNationDraft,
  editingNationFieldChange,
  nationDraftDeleteResult,
  nationDraftSaveResult,
  nationSubmitResult,
  resetNationCreation,
  saveNationDraft,
  startNationCreation,
  startNationEditing,
  submitNation,
} from '../../../src/actions/modifyNation';

describe('modify nation action creators', () => {

  const mockNation = {
    id: '12345',
    name: 'Test nation',
  };
  const mockCallback = jest.fn();
  const mockError = { 'error': 'ERROR' };

  test('startNationCreation', () => {
    expect(startNationCreation()).toEqual({
      type: START_NATION_CREATION,
    });
  });

  test('startNationEditing', () => {
    expect(startNationEditing(mockNation)).toEqual({
      type: START_NATION_EDITING,
      nation: mockNation,
    });
  });

  test('startNationEditing', () => {
    expect(resetNationCreation()).toEqual({
      type: RESET_NATION_CREATION,
    });
  });

  test('editingNationFieldChange', () => {
    const field = 'name';
    const value = 'NEW NAME';
    expect(editingNationFieldChange(field, value)).toEqual({
      type: EDITING_NATION_FIELD_CHANGE,
      payload: value,
      field: field,
    });
  });

  test('cancelNationCreation', () => {
    expect(cancelNationCreation()).toEqual({
      type: CANCEL_NATION_CREATE,
    });
  });

  test('saveNationDraft', () => {
    expect(saveNationDraft(mockNation, mockCallback)).toEqual({
      type: SAVE_NATION_DRAFT,
      nation: mockNation,
      callback: mockCallback,
    });
  });

  test('deleteNationDraft', () => {
    expect(deleteNationDraft(mockNation.id, mockCallback)).toEqual({
      type: DELETE_NATION_DRAFT,
      nationId: mockNation.id,
      callback: mockCallback,
    });
  });

  test('submitNation', () => {
    expect(submitNation(mockNation, mockCallback)).toEqual({
      type: SUBMIT_NATION,
      nation: mockNation,
      callback: mockCallback,
    });
  });

  test('nationDraftSaveResult', () => {
    expect(nationDraftSaveResult(mockNation.id, mockError)).toEqual({
      type: NATION_DRAFT_SAVE_FINISHED,
      nationId: mockNation.id,
      error: mockError,
    });
  });

  test('nationDraftDeleteResult', () => {
    expect(nationDraftDeleteResult(mockNation.id, mockError)).toEqual({
      type: NATION_DRAFT_DELETE_FINISHED,
      nationId: mockNation.id,
      error: mockError,
    });
  });

  test('nationSubmitResult', () => {
    expect(nationSubmitResult(mockNation.id, mockError)).toEqual({
      type: NATION_SUBMIT_FINISHED,
      nationId: mockNation.id,
      error: mockError,
    });
  });

});