import { 
	switchNationTab, openNation, cancelNationCreation, createNation, doneNationCreation, requestFetchNations, joinNation, leaveNation,
	SWITCH_NATIONS_TAB, OPEN_NATION, CANCEL_NATION_CREATE, NATION_CREATE, DONE_NATION_CREATE, START_NATIONS_FETCH, REQUEST_JOIN_NATION, REQUEST_LEAVE_NATION
} from '../../../src/actions/nations';

test('actions - switchNationTab', (done) => {
	const tab = 1;
	expect(switchNationTab(tab)).toEqual({
    type: SWITCH_NATIONS_TAB,
    tab: tab
  })
  done()
})

test('actions - openNation', (done) => {
	const id = 123;
	expect(openNation(id)).toEqual({
    type: OPEN_NATION,
    nationId: id
  })
  done()
})

test('actions - cancelNationCreation', (done) => {
	expect(cancelNationCreation()).toEqual({
    type: CANCEL_NATION_CREATE
  })
  done()
})

test('actions - createNation', (done) => {
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

test('actions - doneNationCreation', (done) => {
	expect(doneNationCreation()).toEqual({
    type: DONE_NATION_CREATE
  })
  done()
})

test('actions - requestFetchNations', (done) => {
	expect(requestFetchNations()).toEqual({
    type: START_NATIONS_FETCH,
  })
  done()
})

test('actions - joinNation', (done) => {
	expect(joinNation()).toEqual({
    type: REQUEST_JOIN_NATION
  })
  done()
})

test('actions - leaveNation', (done) => {
	expect(leaveNation()).toEqual({
    type: REQUEST_LEAVE_NATION
  })
  done()
})