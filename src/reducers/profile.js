import {
  START_USER_EDITING,
  CHANGE_EDITING_USER,
  DONE_USER_EDITING,
  CANCEL_USER_EDITING, START_USER_CREATING,
} from '../actions/profile';

const initialState = {
  user: null,
  editingUser: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_USER_EDITING:
      return Object.assign({}, state, { editingUser: state.user });
    case CHANGE_EDITING_USER:
      return Object.assign({}, state, { editingUser: action.user });
    case CANCEL_USER_EDITING:
      return Object.assign({}, state, { editingUser: null });
    case DONE_USER_EDITING:
      return Object.assign({}, state, { user: state.editingUser, editingUser: null });
    case START_USER_CREATING:
      return Object.assign({}, state, { editingUser: {} });
  }
  return state;
}
