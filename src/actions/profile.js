export const START_USER_CREATING = 'START_USER_CREATING';
export const START_USER_EDITING = 'START_USER_EDITING';
export const CHANGE_EDITING_USER = 'CHANGE_EDITING_USER';
export const DONE_USER_EDITING = 'DONE_USER_EDITING';
export const CANCEL_USER_EDITING = 'CANCEL_USER_EDITING';

export const REQUEST_PROFILE_UPDATE = 'REQUEST_PROFILE_UPDATE';

export function startUserCreating() {
  return {
    type: START_USER_CREATING
  };
}

export function startUserEditing() {
  return {
    type: START_USER_EDITING
  };
}

export function changeEditingUser(user) {
  return {
    type: CHANGE_EDITING_USER,
    user: user,
  };
}

export function cancelUserEditing() {
  return {
    type: CANCEL_USER_EDITING,
  };
}

export function doneUserEditing() {
  return {
    type: DONE_USER_EDITING,
  };
}

export function requestProfileUpdate() {
  return {
    type: REQUEST_PROFILE_UPDATE,
  };
}