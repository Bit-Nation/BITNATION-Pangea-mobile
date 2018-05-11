import reducer, { initialState } from '../../../src/reducers/settings';
import {
  changePasscodeLength,
  changeUseNumericPasscode,
  resetSettings,
  settingsUpdated,
} from '../../../src/actions/settings';

test('initial setting state', () => {
  expect(initialState).toEqual({ passcodeType: { type: 'password' } });
});

describe('settings reducer action handling', () => {
  const stateWithPassword = {
    passcodeType: { type: 'password' },
  };
  const stateWithPinCode = {
    passcodeType: {
      type: 'pinCode',
      length: 6,
    },
  };
  const stateWithCustomLength = {
    passcodeType: {
      type: 'pinCode',
      length: 8,
    },
  };

  test('changeUseNumericPasscode from password to pin code', () => {
    expect(reducer(stateWithPassword, changeUseNumericPasscode(true))).toEqual(stateWithPinCode);
    expect(reducer(stateWithCustomLength, changeUseNumericPasscode(true))).toEqual(stateWithCustomLength);
    expect(reducer(stateWithPassword, changeUseNumericPasscode(false))).toEqual(stateWithPassword);
    expect(reducer(stateWithPinCode, changeUseNumericPasscode(false))).toEqual(stateWithPassword);
  });

  test('changePasscodeLength', () => {
    expect(reducer(stateWithPassword, changePasscodeLength(8))).toEqual(stateWithPassword);
    expect(reducer(stateWithPinCode, changePasscodeLength(8))).toEqual({
      ...stateWithPinCode,
      passcodeType: {
        ...stateWithPinCode.passcodeType,
        length: 8,
      },
    });
  });

  test('resetSettings', () => {
    expect(reducer(stateWithPassword, resetSettings())).toEqual(initialState);
    expect(reducer(stateWithPinCode, resetSettings())).toEqual(initialState);
    expect(reducer(stateWithCustomLength, resetSettings())).toEqual(initialState);
  });

  test('settingsUpdated', () => {
    expect(reducer(stateWithPassword, settingsUpdated(stateWithCustomLength))).toEqual(stateWithCustomLength);
    expect(reducer(stateWithPinCode, settingsUpdated(stateWithPassword))).toEqual(stateWithPassword);
    expect(reducer(stateWithCustomLength, settingsUpdated(stateWithPinCode))).toEqual(stateWithPinCode);
  });

  test('default', () => {
    expect(reducer(stateWithPinCode, { type: 'UNKNOWN' })).toEqual(stateWithPinCode);
  });
});
