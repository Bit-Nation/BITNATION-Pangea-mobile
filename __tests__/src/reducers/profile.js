import { startUserCreating, startUserEditing, changeEditingUser, setUserProfile, cancelUserEditing, doneUserEditing, requestProfileUpdate, getUserProfile } from '../../../src/actions/profile';
import reducer, { emptyProfile, initialState } from '../../../src/reducers/profile';

test('reducer - user profile creation', (done) => {
  const state = reducer(initialState, startUserCreating());
  expect(state).toEqual({ ...initialState, editingUser: emptyProfile });
  done();
});

test('reducer - set user profile', (done) => {
  const user = {
    name: 'Jack',
    location: 'NYC',
  };
  const state = reducer(initialState, setUserProfile(user));
  expect(state).toEqual({ ...initialState, user });

  const state2 = reducer(state, startUserEditing());
  expect(state2).toEqual({ ...state, editingUser: state.user });

  const modifiedUser = {
    name: ' Mike',
    location: 'SanFransisco',
  };
  const state3 = reducer(state2, changeEditingUser(modifiedUser));
  expect(state3).toEqual({ ...state2, editingUser: modifiedUser });

  const state4 = reducer(state3, cancelUserEditing());
  expect(state4).toEqual({ ...state3, editingUser: null });

  const state5 = reducer(state3, doneUserEditing());
  expect(state5).toEqual({
    ...state3,
    editingUser: null,
    user: {
      ...state3.editingUser,
      name: state3.editingUser.name.trim(),
    },
  });
  done();
});
