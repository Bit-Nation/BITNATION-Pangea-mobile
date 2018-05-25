// @flow

import {
  CANCEL_CONFIRMATION,
  SEND_CONFIRMATION,
} from '../actions/confirmation';
import type { Action } from '../actions/confirmation';

export type State = {
  +gasPrice: number,
  +inProgress: boolean,
};

export const initialState: State = {
  gasPrice: 2,
  inProgress: false,
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CANCEL_CONFIRMATION:
      return {
        ...state,
        gasPrice: 2,
      };
    case SEND_CONFIRMATION:
      return {
        ...state,
        inProgress: true,
      };
    default:
      return state;
  }
};
