import { 
  startUserCreating, startUserEditing, changeEditingUser, setUserProfile, cancelUserEditing, doneUserEditing, requestProfileUpdate, getUserProfile,
  START_USER_CREATING, START_USER_EDITING, CHANGE_EDITING_USER, SET_USER_PROFILE, CANCEL_USER_EDITING, DONE_USER_EDITING, REQUEST_PROFILE_UPDATE, REQUEST_GET_PROFILE
} from '../../../src/actions/profile';
import reducer, { initialState } from '../../../src/reducers/profile';

test('reducer - user profile creation', (done) => {
	const state = reducer(initialState, startUserCreating())
	expect(state.editingUser).toEqual({})
  done()
})

test('reducer - set user profile', (done) => {
	const user = {
		name: 'Jack',
		location: 'NYC'
	}
	const state = reducer(initialState, setUserProfile(user))
	expect(state.user).toEqual(user)

	const state2 = reducer(state, startUserEditing())
	expect(state2.editingUser).toEqual(state.user)

	const modifiedUser = {
		name: ' Mike',
		location: 'SanFransisco'
	}
	const state3 = reducer(state2, changeEditingUser(modifiedUser))
	expect(state3.editingUser).toEqual(modifiedUser)

	const state4 = reducer(state3, cancelUserEditing())
	expect(state4.editingUser).toBe(null)

	const state5 = reducer(state3, doneUserEditing())
	expect(state5.editingUser).toBe(null)
	expect(state5.user).toEqual({...state3.editingUser, name: state3.editingUser.name.trim()})

  done()
})
