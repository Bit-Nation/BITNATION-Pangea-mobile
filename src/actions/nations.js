export const SWITCH_NATIONS_TAB = 'SWITCH_NATIONS_TAB';
export const OPEN_NATION = 'OPEN_NATION';
export const CANCEL_NATION_CREATE = 'CANCEL_NATION_CREATE';
export const DONE_NATION_CREATE = 'DONE_NATION_CREATE';

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

export function cancelNationCreation() {
  return {
    type: CANCEL_NATION_CREATE,
  };
}

export function doneNationCreation() {
  return {
    type: DONE_NATION_CREATE,
  };
}