export const START_NATION_CREATION = 'START_NATION_CREATION';
export const START_NATION_EDITING = 'START_NATION_EDITING';
export const CANCEL_NATION_CREATE = 'CANCEL_NATION_CREATE';
export const RESET_NATION_CREATION = 'RESET_NATION_CREATION';
export const EDITING_NATION_FIELD_CHANGE = 'EDITING_NATION_FIELD_CHANGE';
export const SAVE_NATION_DRAFT = 'SAVE_NATION_DRAFT';
export const DELETE_NATION_DRAFT = 'DELETE_NATION_DRAFT';
export const SUBMIT_NATION = 'SUBMIT_NATION';
export const NATION_DRAFT_SAVE_FINISHED = 'NATION_DRAFT_SAVE_FINISHED';
export const NATION_DRAFT_DELETE_FINISHED = 'NATION_DRAFT_DELETE_FINISHED';
export const NATION_SUBMIT_FINISHED = 'NATION_SUBMIT_FINISHED';

export function startNationCreation() {
  return {
    type: START_NATION_CREATION,
  };
}

export function startNationEditing(nation) {
  return {
    type: START_NATION_EDITING,
    nation,
  };
}

export function resetNationCreation() {
  return {
    type: RESET_NATION_CREATION,
  };
}

export function editingNationFieldChange(field, data) {
  return {
    type: EDITING_NATION_FIELD_CHANGE,
    payload: data,
    field: field,
  };
}

export function cancelNationCreation() {
  return {
    type: CANCEL_NATION_CREATE,
  };
}

export function saveNationDraft(nation, callback) {
  return {
    type: SAVE_NATION_DRAFT,
    nation,
    callback,
  };
}

export function deleteNationDraft(nationId, callback) {
  return {
    type: DELETE_NATION_DRAFT,
    nationId,
    callback,
  };
}

export function submitNation(nation) {
  return {
    type: SUBMIT_NATION,
    nation,
  };
}

export function nationDraftSaveResult(nationId, error) {
  return {
    type: NATION_DRAFT_SAVE_FINISHED,
    nationId,
    error,
  };
}


export function nationDraftDeleteResult(nationId, error) {
  return {
    type: NATION_DRAFT_DELETE_FINISHED,
    nationId,
    error,
  };
}


export function nationSubmitResult(nationId, error) {
  return {
    type: NATION_SUBMIT_FINISHED,
    nationId,
    error,
  };
}
