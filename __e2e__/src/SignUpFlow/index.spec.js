import { reloadAppWithDeleteData } from '../helpers';
import {
  actionCreateAccount,
  actionChoicePasscodeType,
  actionTypePasscode,
  actionChoiceAccountType,
  actionTypeProfile,
  actionShowDashBoard,
} from './helpers';

describe('create account', () => {
  beforeEach(async () => {
    await reloadAppWithDeleteData();
  });

  it('create new account with password flow', async () => {
    await actionCreateAccount();
    await actionChoicePasscodeType();
    await actionTypePasscode();
    await actionChoiceAccountType();
    await actionTypeProfile();
    await actionShowDashBoard();
  });

  // it('create new testing account  with password flow', async () => {
  //   await actionCreateAccount();
  //   await actionChoicePasscodeType();
  //   await actionTypePasscode();
  //   await actionChoiceAccountType(true);
  //   await actionTypeProfile();
  //   await actionShowDashBoard();
  // });

  // it('create new account with passcode flow', async () => {
  //   await actionCreateAccount();
  //   await actionChoicePasscodeType(true);
  //   await actionTypePasscode(true);
  //   await actionChoiceAccountType();
  //   await actionTypeProfile();
  //   await actionShowDashBoard();
  // });

  // it('create new testing account with passcode flow', async () => {
  //   await actionCreateAccount();
  //   await actionChoicePasscodeType(true);
  //   await actionTypePasscode(true);
  //   await actionChoiceAccountType(true);
  //   await actionTypeProfile();
  //   await actionShowDashBoard();
  // });
});
