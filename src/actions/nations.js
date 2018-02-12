export const SWITCH_NATIONS_TAB = 'SWITCH_NATIONS_TAB';
export const OPEN_NATION = 'OPEN_NATION';
export const START_NATIONS_FETCH = 'START_NATIONS_FETCH';
export const DONE_FETCH_NATIONS = 'DONE_FETCH_NATIONS';
export const CANCEL_LOADING = 'CANCEL_LOADING';
export const REQUEST_JOIN_NATION = 'REQUEST_JOIN_NATION';
export const REQUEST_LEAVE_NATION = 'REQUEST_LEAVE_NATION';

export function switchNationTab(tab) {
  return {
    type: SWITCH_NATIONS_TAB,
    tab: tab,
  };
}

export function openNation(id) {
  return {
    type: OPEN_NATION,
    nationId: id,
  };
}

export function requestFetchNations() {
  return {
    type: START_NATIONS_FETCH
  };
}

export function joinNation() {
  return {
    type: REQUEST_JOIN_NATION
  };
}

export function leaveNation() {
  return {
    type: REQUEST_LEAVE_NATION
  };
}