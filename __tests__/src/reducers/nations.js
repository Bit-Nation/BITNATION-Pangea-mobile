import { 
	switchNationTab, openNation, cancelNationCreation, createNation, doneNationCreation, requestFetchNations, joinNation, leaveNation,
	SWITCH_NATIONS_TAB, OPEN_NATION, CANCEL_NATION_CREATE, NATION_CREATE, DONE_NATION_CREATE, START_NATIONS_FETCH, REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION
} from '../../../src/actions/nations';
import reducer, { initialState } from '../../../src/reducers/nations';

test('reducer - switchNationTab', (done) => {
	const tab = 1
	const state = reducer(initialState, switchNationTab(tab))
	expect(state).toEqual({...initialState, selectedTab: tab})
  done()
})

test('reducer - openNation', (done) => {
	const id = 123
	const state = reducer(initialState, openNation(id))
	expect(state).toEqual({...initialState, openedNationId: id})
  done()
})

test('reducer - createNation', (done) => {
	const nationData = {
		name: 'test nation',
		description: 'test'
	};
	const navigator = null;
	const state = reducer(initialState, createNation(nationData, navigator))
	expect(state).toEqual({
		...initialState,
		creatingNation: nationData,
		inProgress: true
	})
	
	const state2 = reducer(state, doneNationCreation())
	expect(state2).toEqual({
		...state,
		nation: nationData,
		creatingNation: null,
		inProgress: false
	})
	
	const state3 = reducer(state, cancelNationCreation())
	expect(state3).toEqual({
		...state,
		creatingNation: null,
		inProgress: false
	})
  done()
})

test('reducer - requestFetchNations', (done) => {
	const state = reducer(initialState, requestFetchNations())
	expect(state).toEqual({...initialState, inProgress: true})
  done()
})

test('reducer - joinNation', (done) => {
	const state = reducer(initialState, joinNation())
	expect(state).toEqual({...initialState, inProgress: true})
  done()
})

test('reducer - leaveNation', (done) => {
	const state = reducer(initialState, leaveNation())
	expect(state).toEqual({...initialState, inProgress: true})
  done()
})