import {
  switchNationTab, openNation, joinNation, leaveNation,
  nationsUpdated, doneFetchNations, fetchNationsStarted,
} from '../../../src/actions/nations';
import reducer, { initialState, openedNation } from '../../../src/reducers/nations';
import { servicesDestroyed } from '../../../src/actions/serviceContainer';

const mockNations = [
  {
    id: 1,
    joined: true,
  },
  {
    id: 2,
    joined: false,
  },
];

test('after service destroy returns initial state', () => {
  const changedState = reducer(initialState, nationsUpdated(mockNations));
  expect(reducer(changedState, servicesDestroyed())).toEqual(initialState);
});

test('reducer - switchNationTab', () => {
  const tab = 1;
  const state = reducer(initialState, switchNationTab(tab));
  expect(state).toEqual({ ...initialState, selectedTab: tab });
});

test('reducer - openNation', () => {
  const id = 123;
  const state = reducer(initialState, openNation(id));
  expect(state).toEqual({ ...initialState, openedNationId: id });
});

test('reducer - fetchNationsStarted', () => {
  const state = reducer(initialState, fetchNationsStarted());
  expect(state).toEqual({ ...initialState, inProgress: true });
});

test('reducer - nations updated', () => {
  const state = reducer(initialState, nationsUpdated(mockNations));
  expect(state).toEqual({
    ...initialState,
    nations: mockNations,
    myNationIds: [mockNations[0].id],
  });
});

test('reducer - done fetch nations', () => {
  const stateBefore = { ...initialState, inProgress: true };
  const stateAfter = reducer(stateBefore, doneFetchNations());
  expect(stateAfter).toEqual({
    ...stateBefore,
    inProgress: false,
  });
});

test('reducer - joinNation', () => {
  const state = reducer(initialState, joinNation());
  expect(state).toEqual({ ...initialState, inProgress: true });
});

test('reducer - leaveNation', () => {
  const state = reducer(initialState, leaveNation());
  expect(state).toEqual({ ...initialState, inProgress: true });
});

test('openedNation selector', () => {
  expect(openedNation(initialState)).toBeNull();
  expect(openedNation({ openedNationId: 1, nations: mockNations })).toBe(mockNations[0]);
});
