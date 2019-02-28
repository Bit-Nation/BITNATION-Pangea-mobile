import {
  CHANGE_ENTERED_MNEMONIC,
  CHANGE_MNEMONIC_VALID,
  VALIDATE_ENTERED_MNEMONIC,
  changeEnteredMnemonic,
  changeMnemonicValid,
  validateEnteredMnemonic,
} from '../../../src/actions/key';
import { KEY_LENGTH } from '../../../src/global/Constants';

describe('key action creators', () => {
  const mockMnemonic = new Array(KEY_LENGTH).fill('abc');

  test('validateEnteredMnemonic', () => {
    expect(validateEnteredMnemonic()).toEqual({
      type: VALIDATE_ENTERED_MNEMONIC,
    });
  });

  test('changeMnemonicValid', () => {
    expect(changeMnemonicValid(true)).toEqual({
      type: CHANGE_MNEMONIC_VALID,
      mnemonicValid: true,
    });

    expect(changeMnemonicValid(false)).toEqual({
      type: CHANGE_MNEMONIC_VALID,
      mnemonicValid: false,
    });
  });

  test('changeEnteredMnemonic', () => {
    expect(changeEnteredMnemonic(mockMnemonic)).toEqual({
      type: CHANGE_ENTERED_MNEMONIC,
      mnemonic: mockMnemonic,
    });
  });
});
