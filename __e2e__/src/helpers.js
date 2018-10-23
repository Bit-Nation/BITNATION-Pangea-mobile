export const passCode = '123456';
export const passCodeWrong = '12345678';
export const name = 'DetoxE2ETesting';

export const components = {
  account_wrapperView: 'account_wrapperView',
  account_restoreButton: 'account_restoreButton',
  account_createButton: 'account_createButton',
  accountAccess_wrapperView: 'accountAccess_wrapperView',
  accountAccess_restoreButton: 'accountAccess_restoreButton',
  accountAccess_createButton: 'accountAccess_createButton',
  account_list_item_first: `account_list_item${name}`,
  account_developerSettingView: 'account_developerSettingView',
  account_developerSetting_switchTestingAccount: 'account_developerSetting_switchTestingAccount',
  account_developerSetting_prevButton: 'account_developerSetting_prevButton',
  account_developerSetting_nextButton: 'account_developerSetting_nextButton',
  account_createAccountReadyView: 'account_createAccountReadyView',
  account_createAccountReady_openDashboardButton: 'account_createAccountReady_openDashboardButton',

  security_wrapperView: 'security_wrapperView',
  security_prevButton: 'security_prevButton',
  security_nextButton: 'security_nextButton',

  createPasscode_wrapperView: 'createPasscode_wrapperView',
  enterPasscode_wrapperView: 'enterPasscode_wrapperView',

  password_wrapperView: 'password_wrapperView',
  password_textInput: 'password_textInput',
  password_submitButton: 'password_submitButton',
  pinCode_wrapperView: 'pinCode_wrapperView',
  pinCode_textInput: 'pinCode_textInput',
  pinCode_submitButton: 'pinCode_submitButton',

  setting_profileView: 'setting_profileView',
  switchObject: 'switchObject',
  setting_profile_editNameInput: 'setting_profile_editNameInput',
  setting_profile_editLocationInput: 'setting_profile_editLocationInput',
  setting_profile_doneButton: 'setting_profile_doneButton',

  dashboardView: 'dashboardView',
};

export const reloadApp = () =>
  device.reloadReactNative();

export const reloadAppWithDeleteData = () =>
  device.relaunchApp({ delete: true });

export const tap = (elementId, type = 'id') => {
  switch (type) {
    case 'id': return element(by.id(elementId)).tap();
    case 'text': return element(by.text(elementId)).tap();
    default: return element(by.id(elementId)).tap();
  }
};

export const multiTap = (elementId, type = 'id') => {
  switch (type) {
    case 'id': return element(by.id(elementId)).multiTap(2);
    case 'text': return element(by.text(elementId)).multiTap(2);
    default: return element(by.id(elementId)).multiTap(2);
  }
};

export const waitFor = (action, timeOut = 2000) =>
  waitFor(action).withTimeout(timeOut);

export const assertElementIsVisible = (elementId, type = 'id') => {
  switch (type) {
    case 'id': return expect(element(by.id(elementId))).toBeVisible();
    case 'text': return expect(element(by.text(elementId))).toBeVisible();
    default: return expect(element(by.id(elementId))).toBeVisible();
  }
};

export const typeText = (elementId, text) =>
  element(by.id(elementId)).replaceText(text);
