import {
  SWITCH_NATIONS_TAB,
  OPEN_NATION,
  DONE_FETCH_NATIONS,
  CANCEL_LOADING,
  START_NATIONS_FETCH,
  REQUEST_JOIN_NATION,
  REQUEST_LEAVE_NATION,
} from '../actions/nations';
import { resolveNation, resolveStatus } from '../utils/nations';

export const ALL_NATIONS = 0;
export const MY_NATIONS = 1;

export const initialState = {
  nations: [],
  myNations: [],
  searchString: null,
  selectedTab: ALL_NATIONS,
  openedNationId: null,
  creatingNation: null,
  inProgress: false,
};

export default function (state = initialState, action) {
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
    case DONE_FETCH_NATIONS:
      const myNations = [];
      action.payload.map((nation) => {
        if (nation.joined) {
          myNations.push(nation);
        }
      });
      return {
        ...state,
        nations: action.payload,
        myNations,
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
  }
  return state;
}

export const openedNation = state => resolveNation(state.nations, state.openedNationId);
export const isDraft = (nation) => {
  const status = resolveStatus(nation);

  if (status === null) {
    return false;
  }

  return status.key === 'draft';
};
