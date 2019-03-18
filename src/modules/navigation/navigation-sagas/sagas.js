// @flow
/* eslint-disable no-use-before-define */
import { call } from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';

import { appStyle, screen, tabsStyle, drawerStyle } from 'pangea-common-reactnative/Screens';
import { accountsPresent, getCurrentAccountId } from '@pangea/accounts/accounts-sagas/sagas';
import type { CurrentAccountIdChangedAction } from '@pangea/accounts/accounts-actions';
import type { StartNavigationAction } from '../navigation-actions';
import { CURRENT_ACCOUNT_ID_CHANGED } from '@pangea/accounts/accounts-actions';
import { getCurrentAccount } from '@pangea/accounts/accounts-sagas/sagas';
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
export function* launchLoggedInFlow(): Generator<*, *, any> {
  const isMigrationRequired = yield call(isMigration);
  if (isMigrationRequired) {
    Navigation.startSingleScreenApp({
      screen: screen('MIGRATION_SCREEN'),
      appStyle: { ...appStyle },
    });
  } else {
    Navigation.startTabBasedApp({
      tabs: [
        screen('CHAT_LIST_SCREEN'),
        screen('SERVICES_SCREEN'),
        screen('NATIONS_SCREEN')
      ],
      tabsStyle: { ...tabsStyle },
      appStyle: { ...appStyle },
      drawer: { ...drawerStyle },
    });
  }
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
        : screen('ACCOUNTS_ACCESS_SCREEN'),
    appStyle: { ...appStyle },
  });
}

/**
 * @desc Check if migration is required.
 * @return {void}
 */
export function* isMigration(): Generator<*, *, any> {
  const currentAccount = yield getCurrentAccount();
  if (currentAccount.lastMigrationVersion !== '1.1.0') {
    return true;
  }
  return false;
}
