import saveShouldBeEnabled from '../../../src/utils/profile';

describe('saveShouldBeEnabled', () => {
  const initialProps = {
    user: {
      _id: 1,
      name: 'Pangea',
      location: 'NYC',
    },
    editingUser: {
      _id: 1,
      name: 'Pangea',
      location: 'NYC',
    },
  };

  test('should disable save because no changes are made', () => {
    expect(saveShouldBeEnabled(initialProps.user, initialProps.editingUser)).toBe(false);
  });

  test('should disable save because name is not provided', () => {
    const props1 = {
      ...initialProps,
      editingUser: {
        ...initialProps.editingUser,
        name: '',
      },
    };
    expect(saveShouldBeEnabled(props1.user, props1.editingUser)).toBe(false);
  });

  test('should enable save', () => {
    const props2 = {
      ...initialProps,
      editingUser: {
        ...initialProps.editingUser,
        name: 'Bitnation',
      },
    };
    expect(saveShouldBeEnabled(props2.user, props2.editingUser)).toBe(true);
  });
});
