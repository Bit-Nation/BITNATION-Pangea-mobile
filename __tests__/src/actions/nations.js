import {
  switchNationTab,
  openNation,
  joinNation,
  leaveNation,
  fetchNationsStarted,
  cancelLoading,
  nationsUpdated,
  doneFetchNations,
  SWITCH_NATIONS_TAB,
  OPEN_NATION,
  REQUEST_JOIN_NATION,
  REQUEST_LEAVE_NATION,
  NATIONS_FETCH_STARTED,
  CANCEL_LOADING,
  NATIONS_UPDATED,
  DONE_FETCH_NATIONS,
} from '../../../src/actions/nations';

test('actions - switchNationTab', () => {
  const tab = 1;
  expect(switchNationTab(tab)).toEqual({
    type: SWITCH_NATIONS_TAB,
    tab,
  });
});

test('actions - openNation', () => {
  const id = 123;
  expect(openNation(id)).toEqual({
    type: OPEN_NATION,
    nationId: id,
  });
});

test('actions - fetchNationsStarted', () => {
  expect(fetchNationsStarted()).toEqual({
    type: NATIONS_FETCH_STARTED,
  });
});

test('actions - doneFetchNations', () => {
  expect(doneFetchNations()).toEqual({
    type: DONE_FETCH_NATIONS,
  });
});

test('actions - joinNation', () => {
  expect(joinNation()).toEqual({
    type: REQUEST_JOIN_NATION,
  });
});

test('actions - leaveNation', () => {
  expect(leaveNation()).toEqual({
    type: REQUEST_LEAVE_NATION,
  });
});

test('actions - cancelLoading', () => {
  expect(cancelLoading()).toEqual({
    type: CANCEL_LOADING,
  });
});

test('actions - nationsUpdated', () => {
  const mockNation = {
    id: 'ID',
    name: 'NAME',
  };

  expect(nationsUpdated([mockNation])).toEqual({
    type: NATIONS_UPDATED,
    nations: [mockNation],
  });
});
