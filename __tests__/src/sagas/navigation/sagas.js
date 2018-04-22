import { call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import { launchCorrectFlow, launchLoggedInFlow, launchLoggedOutFlow } from '../../../../src/sagas/navigation/sagas';
import { getCurrentAccountId } from '../../../../src/sagas/accounts/sagas';
import { START_NAVIGATION } from '../../../../src/actions/navigation';
import { CURRENT_ACCOUNT_ID_CHANGED } from '../../../../src/actions/accounts';

describe('launchCorrectFlow on first launch', () => {
  const gen = cloneableGenerator(launchCorrectFlow)({
    type: START_NAVIGATION,
  });

  expect(gen.next().value).toEqual(call(getCurrentAccountId));

  test('currentAccountId is null', () => {
    const clone = gen.clone();
    expect(clone.next(null).value).toEqual(call(launchLoggedOutFlow));
    expect(clone.next().done).toBeTruthy();
  });

  test('currentAccountId is not null', () => {
    const clone = gen.clone();
    expect(clone.next('abc').value).toEqual(call(launchLoggedInFlow));
    expect(clone.next().done).toBeTruthy();
  });
});

describe('launchCorrectFlow on change', () => {
  test('currentAccountId is not null', () => {
    const gen = launchCorrectFlow({
      type: CURRENT_ACCOUNT_ID_CHANGED,
      currentAccountId: 'abc',
    });

    expect(gen.next().value).toEqual(call(launchLoggedInFlow));
    expect(gen.next().done).toBeTruthy();
  });

  test('currentAccountId is null', () => {
    const gen = launchCorrectFlow({
      type: CURRENT_ACCOUNT_ID_CHANGED,
      currentAccountId: null,
    });

    expect(gen.next().value).toEqual(call(launchLoggedOutFlow));
    expect(gen.next().done).toBeTruthy();
  });
});
