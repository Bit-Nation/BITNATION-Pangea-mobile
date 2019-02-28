import { saveShouldBeEnabled } from '../../../src/utils/profile';

describe('saveShouldBeEnabled', () => {
  const initialProps = {
    account: {
      _id: 1,
      name: 'Pangea',
      location: 'NYC',
    },
    editingAccount: {
      _id: 1,
      name: 'Pangea',
      location: 'NYC',
    },
  };

  test('should disable save because no changes are made', () => {
    expect(saveShouldBeEnabled(initialProps.account, initialProps.editingAccount)).toBe(false);
  });

  test('should disable save because name is not provided', () => {
    const props1 = {
      ...initialProps,
      editingAccount: {
        ...initialProps.editingAccount,
        name: '',
      },
    };
    expect(saveShouldBeEnabled(props1.account, props1.editingAccount)).toBe(false);
  });

  test('should enable save', () => {
    const props2 = {
      ...initialProps,
      editingAccount: {
        ...initialProps.editingAccount,
        name: 'Bitnation',
      },
    };
    expect(saveShouldBeEnabled(props2.account, props2.editingAccount)).toBe(true);
  });
});
