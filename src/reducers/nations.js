// @flow
import _ from 'lodash';

import {
  type Action,
  type NationTab,
  SWITCH_NATIONS_TAB,
  OPEN_NATION,
  DONE_FETCH_NATIONS,
  CANCEL_LOADING,
  START_NATIONS_FETCH,
  REQUEST_JOIN_NATION,
  REQUEST_LEAVE_NATION,
} from '../actions/nations';
import type { NationType, NationIdType, EditingNationType } from '../types/Nation';
import { resolveNation, resolveStatus } from '../utils/nations';

type State = {
  nations: Array<NationType>,
  myNationIds: Array<NationIdType>,
  searchString: string | null,
  selectedTab: NationTab,
  openedNationId: NationIdType | null,
  creatingNation: EditingNationType | null,
  inProgress: boolean,
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
 * @desc Modify nation reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed Action.
 * @returns {State} Next state.
 */
export default function (state: State = initialState, action: Action): State {
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
    case START_NATIONS_FETCH:
      return {
        ...state,
        inProgress: true,
      };
    case DONE_FETCH_NATIONS: {
      const myNationIds = _(action.payload)
        .filter(nation => nation.joined)
        .map(nation => nation.id)
        .value();
      return {
        ...state,
        nations: action.payload,
        myNationIds,
        inProgress: false,
      };
    }
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
}

export const openedNation = (state: State) => resolveNation(state.nations, state.openedNationId);
export const isDraft = (nation: NationType) => resolveStatus(nation) === 'draft';
