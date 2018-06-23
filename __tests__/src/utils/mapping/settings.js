import {
  convertToDatabase,
  convertFromDatabase,
} from '../../../../src/utils/mapping/settings';
import { PasscodeTypeValues } from '../../../../src/reducers/settings';

describe('convert setting to database', () => {
  test('password', () => {
    const settings = {
      passcodeType: PasscodeTypeValues.password,
    };

    expect(convertToDatabase(settings, 'test')).toEqual({
      id: 'test',
      passcodeType: 'password',
      pinCodeLength: null,
    });
  });

  test('pin code', () => {
    const settings = {
      passcodeType: PasscodeTypeValues.pinCode,
    };

    expect(convertToDatabase(settings, 'test')).toEqual({
      id: 'test',
      passcodeType: 'pinCode',
      pinCodeLength: 6,
    });
  });
});

describe('convert setting from database', () => {
  test('password', () => {
    const settings = {
      id: 'test',
      passcodeType: 'password',
      pinCodeLength: null,
    };

    expect(convertFromDatabase(settings)).toEqual({
      passcodeType: {
        type: 'password',
      },
    });
  });

  test('pin code', () => {
    const settings = {
      id: 'test',
      passcodeType: 'pinCode',
      pinCodeLength: 7,
    };

    expect(convertFromDatabase(settings)).toEqual({
      passcodeType: {
        type: 'pinCode',
        length: 7,
      },
    });
  });
});

