import {
  startUserCreating, startUserEditing, changeEditingUser, setUserProfile, cancelUserEditing, doneUserEditing, requestProfileUpdate, getUserProfile,
  START_USER_CREATING, START_USER_EDITING, CHANGE_EDITING_USER, SET_USER_PROFILE, CANCEL_USER_EDITING, DONE_USER_EDITING, REQUEST_PROFILE_UPDATE, REQUEST_GET_PROFILE,
} from '../../../src/actions/profile';

test('actions - startUserCreating', (done) => {
  expect(startUserCreating()).toEqual({
    type: START_USER_CREATING,
  });
  done();
});

test('actions - startUserEditing', (done) => {
  expect(startUserEditing()).toEqual({
    type: START_USER_EDITING,
  });
  done();
});

test('actions - changeEditingUser', (done) => {
  const user = {
    name: 'Jack',
    location: 'NYC',
  };
  expect(changeEditingUser(user)).toEqual({
    type: CHANGE_EDITING_USER,
    user,
  });
  done();
});

test('actions - setUserProfile', (done) => {
  const user = {
    name: 'Jack',
    location: 'NYC',
  };
  expect(setUserProfile(user)).toEqual({
    type: SET_USER_PROFILE,
    user,
  });
  done();
});

test('actions - cancelUserEditing', (done) => {
  expect(cancelUserEditing()).toEqual({
    type: CANCEL_USER_EDITING,
  });
  done();
});

test('actions - doneUserEditing', (done) => {
  expect(doneUserEditing()).toEqual({
    type: DONE_USER_EDITING,
  });
  done();
});

test('actions - requestProfileUpdate', (done) => {
  expect(requestProfileUpdate()).toEqual({
    type: REQUEST_PROFILE_UPDATE,
  });
  done();
});

test('actions - getUserProfile', (done) => {
  expect(getUserProfile()).toEqual({
    type: REQUEST_GET_PROFILE,
  });
  done();
});
