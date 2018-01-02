export const SWITCH_NATIONS_TAB = 'SWITCH_NATIONS_TAB';
export const OPEN_NATION = 'OPEN_NATION';

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