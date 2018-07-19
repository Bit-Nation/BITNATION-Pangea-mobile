// @flow
/* eslint-disable no-use-before-define */
import * as React from 'react';
import { call } from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';

import { appStyle, screen, tabsStyle } from '../../global/Screens';
import { accountsPresent, getCurrentAccountId } from '../accounts/sagas';
import type { CurrentAccountIdChangedAction } from '../../actions/accounts';
import type { StartNavigationAction } from '../../actions/navigation';
import { CURRENT_ACCOUNT_ID_CHANGED } from '../../actions/accounts';

/**
 * @desc Launch correct flow based on current account id.
 * @param {CurrentAccountIdChangedAction} action An action.
 * @return {void}
 */
export function* launchCorrectFlow(action: CurrentAccountIdChangedAction | StartNavigationAction): Generator<*, *, any> {
  let currentAccountId: string | null;
  if (action.type === CURRENT_ACCOUNT_ID_CHANGED) {
    ({ currentAccountId } = action);
  } else {
    currentAccountId = yield call(getCurrentAccountId);
  }

  if (currentAccountId === null) {
    const hasAccounts = yield call(accountsPresent);
    yield call(launchLoggedOutFlow, hasAccounts);
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
      screen('CHAT_LIST_SCREEN'),
      screen('NATIONS_SCREEN'),
      screen('WALLET_SCREEN'),
      screen('SETTINGS_SCREEN'),
    ],
    tabsStyle: { ...tabsStyle },
    appStyle: { ...appStyle },
  });
}

/**
 * @desc Launch logged out flow of the app.
 * @param {boolean} hasAccounts Flag that shows if at least one account was created.
 * @return {void}
 */
export function launchLoggedOutFlow(hasAccounts: boolean) {
  Navigation.startSingleScreenApp({
    screen:
      hasAccounts === true
        ? screen('ACCOUNTS_ACCESS_SCREEN')
        : screen('ACCOUNTS_SCREEN'),
    appStyle: { ...appStyle },
  });
}

/**
 * @desc Launch DApp modal screen.
 * @param {string} dAppPublicKey Identity public key of DApp.
 * @param {React.Component} rootComponent Component to be placed as root to modal.
 * @param {Object} context Context to by passed.
 * @return {void}
 */
export function launchDAppModal(dAppPublicKey: string, rootComponent: React.Component<any>, context: Object) {
  Navigation.showModal({
    ...screen('DAPP_MODAL_SCREEN'),
    passProps: {
      ...context,
      dAppPublicKey,
      component: rootComponent,
    },
  });
}
