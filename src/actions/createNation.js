
export const NATION_CREATE = 'NATION_CREATE';
export const CANCEL_NATION_CREATE = 'CANCEL_NATION_CREATE';
export const START_NATION_CREATION = 'START_NATION_CREATION';
export const RESET_NATION = 'RESET_NATION';
export const NATION_FIELD_CHANGE = 'NATION_FIELD_CHANGE';
export const EDITING_NATION_FIELD = 'EDITING_NATION_FIELD';

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

export function createNation(nationData, navigator) {
  return {
    type: NATION_CREATE,
    payload: nationData,
    navigator: navigator
  };
}

export function editingNation(nationData) {
  return {
    type: EDITING_NATION_FIELD,
    payload: nationData,
  };
}