// @flow

import reducer, {
  initialState,
  getCurrentAccount,
  isCreatingAccount,
  buildEmptyAccount,
} from '../../../src/reducers/accounts';
import {
  accountListUpdated,
  changeCreatingAccountField,
  currentAccountIdChanged,
  loginTaskUpdated,
  saveCreatingAccount,
  startAccountCreation,
  startRestoreAccountUsingMnemonic,
} from '../../../src/actions/accounts';
import {
  cancelAccountEditing,
  changeEditingAccount,
  doneAccountEditing,
  startAccountEditing,
} from '../../../src/actions/profile';

const accountMock1 = {
  id: 'Account 1',
  name: 'Name 1',
  accountStore: 'Account store 1',
  networkType: 'main',
  avatar: null,
  location: null,
};

const accountMock2 = {
  id: 'Account 2',
  name: 'Name 2',
  accountStore: 'Account store 2',
  networkType: 'main',
  avatar: null,
  location: null,
};

const stateMock = {
  ...initialState,
  accounts: [accountMock1, accountMock2],
  currentAccountId: accountMock1.id,
};

test('getCurrentAccount', () => {
  expect(getCurrentAccount({
    ...stateMock,
    currentAccountId: null,
  })).toBeNull();

  expect(getCurrentAccount({
    ...stateMock,
    currentAccountId: 'Account 1',
  })).toEqual(accountMock1);
});

test('isCreatingAccount', () => {
  expect(isCreatingAccount({
    ...initialState,
    currentAccountId: null,
    creatingAccount: {
      ...buildEmptyAccount(),
      id: 'ID',
      accountStore: 'Account store',
    },
  })).toBeTruthy();

  expect(getCurrentAccount({
    ...initialState,
    currentAccountId: null,
    creatingAccount: null,
  })).toBeFalsy();

  expect(getCurrentAccount({
    ...initialState,
    currentAccountId: 'ID',
    creatingAccount: null,
  })).toBeFalsy();
});

describe('accounts reducer action handling', () => {
  test('accountListUpdated', () => {
    expect(reducer(initialState, accountListUpdated([accountMock1, accountMock2]))).toEqual({
      ...initialState,
      accounts: [accountMock1, accountMock2],
    });
  });

  test('currentAccountIdChanged', () => {
    expect(reducer(initialState, currentAccountIdChanged('ID 1'))).toEqual({
      ...initialState,
      currentAccountId: 'ID 1',
    });
  });

  test('loginTaskUpdated', () => {
    expect(reducer(initialState, loginTaskUpdated({ inProgress: true, result: null, error: null }))).toEqual({
      ...initialState,
      login: {
        inProgress: true,
        result: null,
        error: null,
      },
    });
  });

  test('startAccountEditing', () => {
    const stateBefore = {
      ...initialState,
      accounts: [accountMock1, accountMock2],
      currentAccountId: 'Account 1',
    };
    expect(reducer(stateBefore, startAccountEditing(accountMock1))).toEqual({
      ...stateBefore,
      editingAccount: accountMock1,
    });
  });

  test('changeEditingAccount', () => {
    const stateBefore = {
      ...initialState,
      editingAccount: accountMock1,
    };
    const changedAccount = {
      ...accountMock1,
      name: 'CHANGED NAME',
    };
    expect(reducer(stateBefore, changeEditingAccount(changedAccount))).toEqual({
      ...stateBefore,
      editingAccount: changedAccount,
    });
  });

  test('cancelAccountEditing', () => {
    const stateBefore = {
      ...initialState,
      editingAccount: accountMock1,
    };
    expect(reducer(stateBefore, cancelAccountEditing())).toEqual({
      ...stateBefore,
      editingAccount: null,
    });

    expect(reducer(initialState, cancelAccountEditing())).toEqual({
      ...initialState,
      editingAccount: null,
    });
  });

  test('doneAccountEditing', () => {
    const stateBefore = {
      ...initialState,
      editingAccount: accountMock1,
    };
    expect(reducer(stateBefore, doneAccountEditing())).toEqual({
      ...stateBefore,
      editingAccount: null,
    });

    expect(reducer(initialState, doneAccountEditing())).toEqual({
      ...initialState,
      editingAccount: null,
    });
  });

  test('startAccountCreation', () => {
    const stateAfter = reducer(initialState, startAccountCreation());
    expect(stateAfter.creatingAccount).not.toBeNull();

    // Since id is generated randomly we can not expect it to be equal.
    const account = {
      ...buildEmptyAccount(),
      // Since we use expect above, we know that creatingAccount is not null.
      // $FlowFixMe
      id: stateAfter.creatingAccount.id,
    };
    expect(stateAfter).toEqual({
      ...initialState,
      currentCreation: { type: 'create' },
      creatingAccount: account,
      editingAccount: account,
    });

    expect(stateAfter.creatingAccount).toEqual(stateAfter.editingAccount);
  });

  test('changeCreatingAccountField', () => {
    const stateBefore = {
      ...initialState,
      creatingAccount: accountMock1,
    };
    expect(reducer(stateBefore, changeCreatingAccountField('name', 'CHANGED NAME'))).toEqual({
      ...stateBefore,
      creatingAccount: {
        ...accountMock1,
        name: 'CHANGED NAME',
      },
    });
  });

  test('startRestoreAccountUsingMnemonic', () => {
    const mnemonicMock = ['a', 'a', 'a', 'a', 'a', 'a'];
    const stateAfter = reducer(initialState, startRestoreAccountUsingMnemonic(mnemonicMock));
    expect(stateAfter.creatingAccount).not.toBeNull();

    // Since id is generated randomly we can not expect it to be equal.
    const account = {
      ...buildEmptyAccount(),
      // Since we use expect above, we know that creatingAccount is not null.
      // $FlowFixMe
      id: stateAfter.creatingAccount.id,
    };
    expect(stateAfter).toEqual({
      ...initialState,
      currentCreation: { type: 'restore', mnemonic: mnemonicMock },
      creatingAccount: account,
      editingAccount: account,
    });

    expect(stateAfter.creatingAccount).toEqual(stateAfter.editingAccount);
  });

  test('saveCreatingAccount', () => {
    const stateBefore = {
      ...initialState,
      creatingAccount: accountMock1,
    };
    const callbackMock = jest.fn();

    expect(reducer(stateBefore, saveCreatingAccount(callbackMock))).toEqual({
      ...stateBefore,
      currentCreation: null,
    });

    expect(reducer(initialState, saveCreatingAccount(callbackMock))).toEqual({
      ...initialState,
      currentCreation: null,
    });
  });
});

describe('buildEmptyAccount', () => {
  test('generates empty account', () => {
    const account = buildEmptyAccount();
    expect(account.id).toBeDefined();
    expect(account.name).toBeNull();
    expect(account.accountStore).toBeNull();
    expect(account.networkType).toEqual('main');
    expect(account.location).toBeNull();
    expect(account.avatar).toBeNull();
  });

  test('generates different ids', () => {
    expect(buildEmptyAccount().id).not.toEqual(buildEmptyAccount().id);
  });
});
