import { switchNationTab, openNation, cancelNationCreation, createNation, doneNationCreation, requestFetchNations, joinNation, leaveNation } from '../../../src/actions/nations';
import { SWITCH_NATIONS_TAB, OPEN_NATION, CANCEL_NATION_CREATE, NATION_CREATE, DONE_NATION_CREATE, START_NATIONS_FETCH, REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION } from '../../../src/actions/nations';

test('switchNationTab should return an action to switch between tabs', (done) => {
	const tab = 1;
	expect(switchNationTab(tab)).toEqual({
    type: SWITCH_NATIONS_TAB,
    tab: tab
  })
  done()
})

test('openNation should return an action to open a nation', (done) => {
	const id = 123;
	expect(openNation(id)).toEqual({
    type: OPEN_NATION,
    nationId: id
  })
  done()
})

test('cancelNationCreation should return an action to cancel creating nation', (done) => {
	expect(cancelNationCreation()).toEqual({
    type: CANCEL_NATION_CREATE
  })
  done()
})

test('createNation should return an action to create a nation', (done) => {
	const nationData = {
		name: 'test nation',
		description: 'test'
	};
	const navigator = null;
	expect(createNation(nationData, navigator)).toEqual({
    type: NATION_CREATE,
    payload: nationData,
    navigator: navigator
  })
  done()
})

test('doneNationCreation should return an action to finalize nation creation', (done) => {
	expect(doneNationCreation()).toEqual({
    type: DONE_NATION_CREATE
  })
  done()
})

test('requestFetchNations should return an action to trigger nation fetch request', (done) => {
	expect(requestFetchNations()).toEqual({
    type: START_NATIONS_FETCH,
  })
  done()
})

test('joinNation should return an action to join a nation', (done) => {
	expect(joinNation()).toEqual({
    type: REQUEST_JOIN_NATION
  })
  done()
})

test('leaveNation should return an action to leave a nation', (done) => {
	expect(leaveNation()).toEqual({
    type: REQUEST_LEAVE_NATION
  })
  done()
})