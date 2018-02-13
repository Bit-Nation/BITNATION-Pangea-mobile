import {
  START_USER_EDITING,
  CHANGE_EDITING_USER,
  DONE_USER_EDITING,
  CANCEL_USER_EDITING, START_USER_CREATING,
  SET_USER_PROFILE
} from '../actions/profile';

export const initialState = {
  user: null,
  editingUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_USER_EDITING:
      return {
        ...state,
        editingUser: state.user
      };
    case CHANGE_EDITING_USER:
      return {
        ...state,
        editingUser: action.user
      };
    case CANCEL_USER_EDITING:
      return {
        ...state,
        editingUser: null 
      };
    case DONE_USER_EDITING:
      let newUser = {
        ...state.editingUser,
        name: state.editingUser.name ? state.editingUser.name.trim() : '',
        location: state.editingUser.location ? state.editingUser.location.trim() : '',
      };
      return {
        ...state,
        user: newUser,
        editingUser: null 
      };
    case START_USER_CREATING:
      return {
        ...state,
        editingUser: {}
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}
