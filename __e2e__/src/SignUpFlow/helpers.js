import { passCode, name, components, assertElementIsVisible, tap, typeText } from '../helpers';

export const actionCreateAccount = async (haveAccount = false) => {
  if (haveAccount) {
    await assertElementIsVisible(components.accountAccess_wrapperView);
    await tap(components.accountAccess_createButton);
  } else {
    await assertElementIsVisible(components.account_wrapperView);
    await tap(components.account_createButton);
  }
};

export const actionChoicePasscodeType = async (isUsePassCode = false) => {
  await assertElementIsVisible(components.security_wrapperView);
  if (isUsePassCode) {
    await tap(components.switchObject);
  }
  await tap(components.security_nextButton);
};

export const actionTypePasscode = async (isUsePassCode = false) => {
  await assertElementIsVisible(components.createPasscode_wrapperView);
  await assertElementIsVisible(isUsePassCode ? components.pinCode_wrapperView : components.password_wrapperView);
  await typeText(isUsePassCode ? components.pinCode_textInput : components.password_textInput, passCode);
  await tap(isUsePassCode ? components.pinCode_submitButton : components.password_submitButton);
  await assertElementIsVisible(isUsePassCode ? components.pinCode_wrapperView : components.password_wrapperView);
  await typeText(isUsePassCode ? components.pinCode_textInput : components.password_textInput, passCode);
  await tap(isUsePassCode ? components.pinCode_submitButton : components.password_submitButton);
};

export const actionEnterPasscode = async (isUsePassCode = false) => {
  await assertElementIsVisible(components.enterPasscode_wrapperView);
  await assertElementIsVisible(isUsePassCode ? components.pinCode_wrapperView : components.password_wrapperView);
  await typeText(isUsePassCode ? components.pinCode_textInput : components.password_textInput, passCode);
  await tap(isUsePassCode ? components.pinCode_submitButton : components.password_submitButton);
};

export const actionChoiceAccountType = async (testingAccount = false) => {
  await assertElementIsVisible(components.account_developerSettingView);
  if (testingAccount) {
    await tap(components.account_developerSetting_switchTestingAccount);
  }
  await tap(components.account_developerSetting_nextButton);
};

export const actionTypeProfile = async () => {
  await assertElementIsVisible(components.setting_profileView);
  await typeText(components.setting_profile_editNameInput, name);
  await tap(components.setting_profile_doneButton);
  await assertElementIsVisible(components.account_createAccountReadyView);
  await tap(components.account_createAccountReady_openDashboardButton);
};

export const actionShowDashBoard = async () => {
  await assertElementIsVisible(components.dashboardView);
};
