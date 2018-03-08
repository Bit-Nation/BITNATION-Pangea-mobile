// @flow

import { combineReducers } from 'redux';
import profile from './profile';
import nations from './nations';
import modifyNation from './modifyNation';
import wallet from './wallet';
import key from './key';
import activity from './activity';
import testingMode from './testingMode';
import chat from './chat';

const rootReducer = {
  profile,
  nations,
  modifyNation,
  wallet,
  key,
  activity,
  testingMode,
  chat
};

export default combineReducers(rootReducer);
