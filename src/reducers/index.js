import { combineReducers } from 'redux';
import profile from './profile';
import nations from './nations';
import wallet from './wallet';
import key from './key';
import testingMode from './testingMode';

const rootReducer = {
  profile,
  nations,
  wallet,
  key,
  testingMode,
};

export default combineReducers(rootReducer);
