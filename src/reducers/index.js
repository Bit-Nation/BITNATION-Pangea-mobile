import { combineReducers } from 'redux';
import profile from './profile';
import nations from './nations';
import createNation from './createNation';
import wallet from './wallet';
import key from './key';
import testingMode from './testingMode';

const rootReducer = {
  profile,
  nations,
  createNation,
  wallet,
  key,
  testingMode,
};

export default combineReducers(rootReducer);
