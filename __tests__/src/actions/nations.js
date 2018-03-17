import {
  switchNationTab, openNation, joinNation, leaveNation, fetchNationsStarted,
  SWITCH_NATIONS_TAB, OPEN_NATION, REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION,
  NATIONS_FETCH_STARTED,
} from '../../../src/actions/nations';

test('actions - switchNationTab', (done) => {
  const tab = 1;
  expect(switchNationTab(tab)).toEqual({
    type: SWITCH_NATIONS_TAB,
    tab,
  });
  done();
});

test('actions - openNation', (done) => {
  const id = 123;
  expect(openNation(id)).toEqual({
    type: OPEN_NATION,
    nationId: id,
  });
  done();
});

test('actions - fetchNationsStarted', (done) => {
  expect(fetchNationsStarted()).toEqual({
    type: NATIONS_FETCH_STARTED,
  });
  done();
});

test('actions - joinNation', (done) => {
  expect(joinNation()).toEqual({
    type: REQUEST_JOIN_NATION,
  });
  done();
});

test('actions - leaveNation', (done) => {
  expect(leaveNation()).toEqual({
    type: REQUEST_LEAVE_NATION,
  });
  done();
});
