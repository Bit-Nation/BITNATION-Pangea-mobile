import {
  CHANGE_ENTERED_MNEMONIC,
  CHANGE_MNEMONIC_VALID,
  CREATE_PRIVATE_KEY,
  MNEMONIC_CREATED,
  REMOVE_ALL_PRIVATE_KEYS,
  REMOVE_PRIVATE_KEY,
  SAVE_PRIVATE_KEY,
  VALIDATE_ENTERED_MNEMONIC,
  changeEnteredMnemonic,
  changeMnemonicValid,
  createPrivateKey,
  mnemonicCreated,
  removeAllPrivateKeys,
  removePrivateKey,
  savePrivateKey,
  validateEnteredMnemonic,
} from '../../../src/actions/key';
import { KEY_LENGTH } from '../../../src/global/Constants';

describe('key action creators', () => {

  const mockMnemonic = new Array(KEY_LENGTH).fill('abc');

  test('createPrivateKey', () => {
    expect(createPrivateKey()).toEqual({
      type: CREATE_PRIVATE_KEY,
    });
  });

  test('removeAllPrivateKeys', () => {
    expect(removeAllPrivateKeys()).toEqual({
      type: REMOVE_ALL_PRIVATE_KEYS,
    });
  });

  test('removePrivateKey', () => {
    expect(removePrivateKey()).toEqual({
      type: REMOVE_PRIVATE_KEY,
    });
  });

  test('mnemonicCreated', () => {
    expect(mnemonicCreated(mockMnemonic)).toEqual({
      type: MNEMONIC_CREATED,
      mnemonic: mockMnemonic,
    });
  });

  test('savePrivateKey', () => {
    expect(savePrivateKey()).toEqual({
      type: SAVE_PRIVATE_KEY,
    });
  });

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
