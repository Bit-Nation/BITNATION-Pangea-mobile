// @flow
import _ from 'lodash';

import {
  type Action,
  type NationTab,
  SWITCH_NATIONS_TAB,
  OPEN_NATION,
  DONE_FETCH_NATIONS,
  CANCEL_LOADING,
  NATIONS_FETCH_STARTED,
  REQUEST_JOIN_NATION,
  REQUEST_LEAVE_NATION,
  NATIONS_UPDATED,
} from '../actions/nations';
import type { NationType, NationIdType, EditingNationType } from '../types/Nation';
import { resolveNation } from '../utils/nations';

export type State = {
  +nations: Array<NationType>,
  +myNationIds: Array<NationIdType>,
  +searchString: string | null,
  +selectedTab: NationTab,
  +openedNationId: NationIdType | null,
  +creatingNation: EditingNationType | null,
  +inProgress: boolean,
}

export const initialState: State = {
  nations: [],
  myNationIds: [],
  searchString: null,
  selectedTab: 'ALL_NATIONS',
  openedNationId: null,
  creatingNation: null,
  inProgress: false,
};

/**
 * @desc Nations reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SWITCH_NATIONS_TAB:
      return {
        ...state,
        selectedTab: action.tab,
      };
    case OPEN_NATION:
      return {
        ...state,
        openedNationId: action.nationId,
      };
    case NATIONS_FETCH_STARTED:
      return {
        ...state,
        inProgress: true,
      };
    case NATIONS_UPDATED: {
      const myNationIds = _(action.nations)
        .filter(nation => nation.joined)
        .map(nation => nation.id)
        .value();
      return {
        ...state,
        nations: action.nations,
        myNationIds,
      };
    }
    case DONE_FETCH_NATIONS:
      return {
        ...state,
        inProgress: false,
      };
    case REQUEST_JOIN_NATION:
      return {
        ...state,
        inProgress: true,
      };
    case REQUEST_LEAVE_NATION:
      return {
        ...state,
        inProgress: true,
      };
    case CANCEL_LOADING:
      return {
        ...state,
        inProgress: false,
      };
    default:
      return state;
  }
};

export const openedNation = (state: State): NationType | null => {
  if (state.openedNationId !== null) {
    return resolveNation(state.nations, state.openedNationId);
  }
  return null;
};
