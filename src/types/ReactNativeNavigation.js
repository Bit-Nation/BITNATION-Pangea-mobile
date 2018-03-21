// @flow

export type NavigatorEvent = {
  id: string,
  type: string,
}

export type Navigator = {
  push: (?any) => void,
  pop: (?any) => void,
  showModal: (?any) => void,
  dismissModal: (?any) => void,
  setButtons: (?any) => void,
  switchToTab: (?any) => void,
  setOnNavigatorEvent: ((NavigatorEvent) => void) => void,
}
