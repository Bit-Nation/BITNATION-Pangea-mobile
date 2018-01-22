import { combineReducers } from 'redux';
import profile from './profile';
import nations from './nations';
import wallet from './wallet';
import key from './key';

const rootReducer = {
  profile,
  nations,
  wallet,
  key,
};

export default combineReducers(rootReducer);
