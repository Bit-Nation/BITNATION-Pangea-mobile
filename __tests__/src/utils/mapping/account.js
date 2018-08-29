import {
  convertToDatabase,
  convertFromDatabase,
} from '../../../../src/utils/mapping/account';

describe('convert account to database', () => {
  test('without required params', () => {
    const account = {
      id: 'Test',
      name: 'Name',
      location: 'Location',
      accountStore: null, // This one is required, but passed null
      avatar: 'Test avatar',
      networkType: 'main',
    };

    // Since there is no account store, we can not create account.
    expect(convertToDatabase(account)).toBeNull();
  });

  test('required params only', () => {
    const account = {
      id: 'Test',
      name: 'Name',
      accountStore: 'Account store',
      networkType: 'dev',
    };

    const version = '0.0.0';

    expect(convertToDatabase(account, version)).toEqual({
      id: 'Test',
      name: 'Name',
      profileImage: '',
      location: '',
      description: '',
      accountStore: 'Account store',
      networkType: 'dev',
      confirmedMnemonic: false,
      DHT: [],
      lastMigrationVersion: version,
    });
  });

  test('full account', () => {
    const account = {
      id: 'Test',
      name: 'Name',
      location: 'Location',
      avatar: 'Avatar',
      accountStore: 'Account store',
      networkType: 'dev',
      confirmedMnemonic: true,
    };

    const version = '0.0.0';

    expect(convertToDatabase(account)).toEqual({
      id: 'Test',
      name: 'Name',
      profileImage: 'Avatar',
      location: 'Location',
      description: '',
      accountStore: 'Account store',
      networkType: 'dev',
      confirmedMnemonic: true,
      DHT: [],
      lastMigrationVersion: version,
    });
  });
});

describe('convert setting from database', () => {
  test('simple', () => {
    const account = {
      id: 'Test',
      name: 'Name',
      profileImage: 'Profile image',
      location: 'Location',
      description: 'Description',
      accountStore: 'Account store',
      networkType: 'dev',
      confirmedMnemonic: true,
      DHT: [],
    };

    expect(convertFromDatabase(account)).toEqual({
      id: 'Test',
      name: 'Name',
      avatar: 'Profile image',
      location: 'Location',
      accountStore: 'Account store',
      networkType: 'dev',
      confirmedMnemonic: true,
    });
  });
});

