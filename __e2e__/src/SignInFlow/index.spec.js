import { reloadApp, reloadAppWithDeleteData } from '../helpers';
import {
  actionCreateAccount,
  actionChoicePasscodeType,
  actionTypePasscode,
  actionEnterPasscode,
  actionChoiceAccountType,
  actionTypeProfile,
  actionShowDashBoard,
} from '../SignUpFlow/helpers';
import { actionChoiceAccountInList } from './helpers';

describe('create account and login', () => {
  beforeEach(async () => {
    await reloadAppWithDeleteData();
  });

  it('create new account with password flow and login after', async () => {
    await actionCreateAccount();
    await actionChoicePasscodeType();
    await actionTypePasscode();
    await actionChoiceAccountType();
    await actionTypeProfile();
    await actionShowDashBoard();
    await reloadApp();
    await actionChoiceAccountInList();
    await actionEnterPasscode();
    await actionShowDashBoard();
  });

  // it('create new testing account  with password flow and login after', async () => {
  //   await actionCreateAccount();
  //   await actionChoicePasscodeType();
  //   await actionTypePasscode();
  //   await actionChoiceAccountType(true);
  //   await actionTypeProfile();
  //   await actionShowDashBoard();
  //   await reloadApp();
  //   await actionChoiceAccountInList();
  //   await actionEnterPasscode();
  //   await actionShowDashBoard();
  // });

  // it('create new account with passcode flow and login after', async () => {
  //   await actionCreateAccount();
  //   await actionChoicePasscodeType(true);
  //   await actionTypePasscode(true);
  //   await actionChoiceAccountType();
  //   await actionTypeProfile();
  //   await actionShowDashBoard();
  //   await reloadApp();
  //   await actionChoiceAccountInList();
  //   await actionEnterPasscode(true);
  //   await actionShowDashBoard();
  // });

  // it('create new testing account  with passcode flow and login after', async () => {
  //   await actionCreateAccount();
  //   await actionChoicePasscodeType(true);
  //   await actionTypePasscode(true);
  //   await actionChoiceAccountType(true);
  //   await actionTypeProfile();
  //   await actionShowDashBoard();
  //   await reloadApp();
  //   await actionChoiceAccountInList();
  //   await actionEnterPasscode(true);
  //   await actionShowDashBoard();
  // });
});
