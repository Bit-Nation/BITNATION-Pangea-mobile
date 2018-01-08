import { combineReducers } from 'redux';
import profile from './profile';
import nations from './nations';
import wallet from './wallet';

const rootReducer = {
  profile,
  nations,
  wallet,
};

export default combineReducers(rootReducer);
