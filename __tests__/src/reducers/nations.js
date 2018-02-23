import { switchNationTab, openNation, requestFetchNations, joinNation, leaveNation, DONE_FETCH_NATIONS } from '../../../src/actions/nations';
import reducer, { initialState } from '../../../src/reducers/nations';

test('reducer - switchNationTab', (done) => {
  const tab = 1;
  const state = reducer(initialState, switchNationTab(tab));
  expect(state).toEqual({ ...initialState, selectedTab: tab });
  done();
});

test('reducer - openNation', (done) => {
  const id = 123;
  const state = reducer(initialState, openNation(id));
  expect(state).toEqual({ ...initialState, openedNationId: id });
  done();
});

test('reducer - requestFetchNations', (done) => {
  const state = reducer(initialState, requestFetchNations());
  expect(state).toEqual({ ...initialState, inProgress: true });
  done();
});

test('reducer - done fetch nations', (done) => {
  const fakeNations = [
    {
      name: 'Nation1',
      joined: true,
    },
    {
      name: 'Nation2',
      joined: false,
    },
  ];
  const state = reducer(initialState, { type: DONE_FETCH_NATIONS, payload: fakeNations });
  expect(state).toEqual({
    ...initialState,
    nations: fakeNations,
    myNations: [fakeNations[0]],
    inProgress: false,
  });
  done();
});

test('reducer - joinNation', (done) => {
  const state = reducer(initialState, joinNation());
  expect(state).toEqual({ ...initialState, inProgress: true });
  done();
});

test('reducer - leaveNation', (done) => {
  const state = reducer(initialState, leaveNation());
  expect(state).toEqual({ ...initialState, inProgress: true });
  done();
});
