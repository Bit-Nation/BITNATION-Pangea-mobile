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
};

const accountMock2 = {
  id: 'Account 2',
  name: 'Name 2',
  accountStore: 'Account store 2',
  networkType: 'main',
};

const stateMock = {
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
    currentAccountId: null,
    creatingAccount: {
      id: 'ID',
      accountStore: 'Account store',
    },
  })).toBeTruthy();

  expect(getCurrentAccount({
    currentAccountId: null,
    creatingAccount: null,
  })).toBeFalsy();

  expect(getCurrentAccount({
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
      accounts: [accountMock1, accountMock2],
      currentAccountId: 'Account 1',
    };
    expect(reducer(stateBefore, startAccountEditing())).toEqual({
      ...stateBefore,
      editingAccount: accountMock1,
    });
  });

  test('changeEditingAccount', () => {
    const stateBefore = {
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
    // Since id is generated randomly we can not expect it to be equal.
    const account = {
      ...buildEmptyAccount(),
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
    // Since id is generated randomly we can not expect it to be equal.
    const account = {
      ...buildEmptyAccount(),
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
      creatingAccount: accountMock1,
    };
    expect(reducer(stateBefore, saveCreatingAccount())).toEqual({
      ...stateBefore,
      currentCreation: null,
    });

    expect(reducer(initialState, saveCreatingAccount())).toEqual({
      ...initialState,
      currentCreation: null,
    });
  });

  test('default', () => {
    expect(reducer(stateMock, { type: 'UNKNOWN' })).toEqual(stateMock);
  });
});
