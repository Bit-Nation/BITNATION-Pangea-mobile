export const START_NATION_CREATION = 'START_NATION_CREATION';
export const CANCEL_NATION_CREATE = 'CANCEL_NATION_CREATE';
export const RESET_NATION = 'RESET_NATION';
export const NATION_FIELD_CHANGE = 'NATION_FIELD_CHANGE';
export const SAVE_NATION_DRAFT = 'SAVE_NATION_DRAFT';

export function startNationCreation() {
  return {
    type: START_NATION_CREATION,
  };
}

export function resetNationCreation() {
  return {
    type: RESET_NATION,
  };
}

export function nationFieldChange(field, data) {
  return {
    type: NATION_FIELD_CHANGE,
    payload: data,
    field: field,
  };
}

export function cancelNationCreation() {
  return {
    type: CANCEL_NATION_CREATE,
  };
}

export function saveNationDraft() {
  return {
    type: SAVE_NATION_DRAFT,
  };
}
