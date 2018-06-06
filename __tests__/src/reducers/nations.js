import {
  switchNationTab, openNation, joinNation, leaveNation,
  nationsUpdated, doneFetchNations, fetchNationsStarted,
} from '../../../src/actions/nations';
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

test('reducer - fetchNationsStarted', (done) => {
  const state = reducer(initialState, fetchNationsStarted());
  expect(state).toEqual({ ...initialState, inProgress: true });
  done();
});

test('reducer - nations updated', (done) => {
  const mockNations = [
    {
      id: 'Nation1',
      joined: true,
    },
    {
      id: 'Nation2',
      joined: false,
    },
  ];
  const state = reducer(initialState, nationsUpdated(mockNations));
  expect(state).toEqual({
    ...initialState,
    nations: mockNations,
    myNationIds: [mockNations[0].id],
  });
  done();
});

test('reducer - done fetch nations', (done) => {
  const stateBefore = { ...initialState, inProgress: true };
  const stateAfter = reducer(stateBefore, doneFetchNations());
  expect(stateAfter).toEqual({
    ...stateBefore,
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
