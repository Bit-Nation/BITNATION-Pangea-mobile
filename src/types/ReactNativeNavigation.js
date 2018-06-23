// @flow

export type NavigatorEvent = {
  id: string,
  type: string,
}

export type Navigator = {
  push: (?any) => void,
  pop: (?any) => void,
  popToRoot: (?any) => void,
  showModal: (?any) => void,
  dismissModal: () => void,
  dismissAllModals: () => void,
  setButtons: (?any) => void,
  switchToTab: (?any) => void,
  setOnNavigatorEvent: ((NavigatorEvent) => void) => void,
}
