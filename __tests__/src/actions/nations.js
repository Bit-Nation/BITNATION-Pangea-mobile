import {
  switchNationTab, openNation, requestFetchNations, joinNation, leaveNation,
  SWITCH_NATIONS_TAB, OPEN_NATION, START_NATIONS_FETCH, REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION,
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

test('actions - requestFetchNations', (done) => {
  expect(requestFetchNations()).toEqual({
    type: START_NATIONS_FETCH,
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
