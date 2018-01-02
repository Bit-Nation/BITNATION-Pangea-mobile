import { combineReducers } from 'redux';
import profile from './profile';
import nations from './nations';

const rootReducer = {
  profile,
  nations,
};

export default combineReducers(rootReducer);
