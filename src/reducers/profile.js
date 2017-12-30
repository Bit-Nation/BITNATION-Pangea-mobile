import {
  START_USER_EDITING,
  CHANGE_EDITING_USER,
  DONE_USER_EDITING,
  CANCEL_USER_EDITING,
} from '../actions/profile';

const initialState = {
  user: {
    'name': 'Mimetic',
    'location': 'Oakland, California, USA',
    'latitude': '37.8043637',
    'longitude': '-122.2711137',
    'ethAddress': '0x0eb81892540747ec60f1389ec734a2c0e5f9f735',
  },
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
  }
  return state;
}
