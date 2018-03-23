import saveShouldBeEnabled from '../../../src/utils/profile';

describe('saveShouldBeEnabled', () => {
  let props = {
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
    expect(saveShouldBeEnabled(props)).toBe(false);
  });

  test('should disable save because name is not provided', () => {
    props = {
      ...props,
      editingUser: {
        ...props.editingUser,
        name: '',
      },
    };
    expect(saveShouldBeEnabled(props)).toBe(false);
  });

  test('should enable save', () => {
    props = {
      ...props,
      editingUser: {
        ...props.editingUser,
        name: 'Bitnation',
      },
    };
    expect(saveShouldBeEnabled(props)).toBe(true);
  });
});
