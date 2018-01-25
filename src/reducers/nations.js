import {
  SWITCH_NATIONS_TAB,
  OPEN_NATION,
  CANCEL_NATION_CREATE,
  NATION_CREATE,
  DONE_NATION_CREATE,
  DONE_FETCH_NATIONS,
  CANCEL_LOADING,
  START_NATIONS_FETCH,
  REQUEST_JOIN_NATION,
  REQUEST_LEAVE_NATION
} from '../actions/nations';

export const ALL_NATIONS = 0;
export const MY_NATIONS = 1;

const initialState = {
  nations: [],
  myNations: [],
  searchString: null,
  selectedTab: ALL_NATIONS,
  openedNationId: null,
  nation: null,
  creatingNation: null,
  inProgress: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SWITCH_NATIONS_TAB:
      return {
        ...state,
        selectedTab: action.tab
      };
    case OPEN_NATION:
      return {
        ...state,
        openedNationId: action.nationId
      };
    case CANCEL_NATION_CREATE:
      return {
        ...state,
        creatingNation: null
      };
    case NATION_CREATE:
      return {
        ...state,
        creatingNation: action.payload,
        inProgress: true
      };
    case DONE_NATION_CREATE:
      return {
        ...state,
        nation: state.creatingNation,
        creatingNation: null,
        inProgress: false
      };
    case START_NATIONS_FETCH:
      return {
        ...state,
        inProgress: true
      };
    case DONE_FETCH_NATIONS:
      let myNations = [];
      action.payload.map((nation) => {
        if (nation.joined) {
          myNations.push(nation);
        }
      })
      return {
        ...state,
        nations: action.payload,
        myNations: myNations,
        inProgress: false
      };
    case REQUEST_JOIN_NATION:
      return {
        ...state,
        inProgress: true
      };
    case REQUEST_LEAVE_NATION:
      return {
        ...state,
        inProgress: true
      };
    case CANCEL_LOADING: 
      return {
        ...state,
        inProgress: false
      };
  }
  return state;
}
