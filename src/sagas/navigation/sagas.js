// @flow

/* eslint-disable no-use-before-define */
import { call } from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';

import { appStyle, screen, tabsStyle } from '../../global/Screens';
import { getCurrentAccountId } from '../accounts/sagas';
import type { CurrentAccountIdChangedAction } from '../../actions/accounts';
import type { StartNavigationAction } from '../../actions/navigation';
import { CURRENT_ACCOUNT_ID_CHANGED } from '../../actions/accounts';

/**
 * @desc Launch correct flow based on current account id.
 * @param {CurrentAccountIdChangedAction} action An action.
 * @return {void}
 */
export function* launchCorrectFlow(action: CurrentAccountIdChangedAction | StartNavigationAction): Generator<*, *, *> {
  let currentAccountId: string | null;
  if (action.type === CURRENT_ACCOUNT_ID_CHANGED) {
    ({ currentAccountId } = action);
  } else {
    currentAccountId = yield call(getCurrentAccountId);
  }

  if (currentAccountId === null) {
    yield call(launchLoggedOutFlow);
  } else {
    yield call(launchLoggedInFlow);
  }
}

/**
 * @desc Launch logged in flow of the app.
 * @return {void}
 */
export function launchLoggedInFlow() {
  Navigation.startTabBasedApp({
    tabs: [
      screen('DASHBOARD_SCREEN'),
      screen('CHAT_NATIONS_SCREEN'),
      screen('NATIONS_SCREEN'),
      screen('WALLET_SCREEN'),
      screen('PROFILE_SCREEN'),
    ],
    tabsStyle: { ...tabsStyle },
    appStyle: { ...appStyle },
  });
}

/**
 * @desc Launch logged out flow of the app.
 * @return {void}
 */
export function launchLoggedOutFlow() {
  Navigation.startSingleScreenApp({
    screen: screen('INTRO_SCREEN'),
    appStyle: { ...appStyle },
  });
}
