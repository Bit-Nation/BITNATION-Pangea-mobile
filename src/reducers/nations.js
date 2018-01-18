import {
  SWITCH_NATIONS_TAB,
  OPEN_NATION,
  CANCEL_NATION_CREATE,
  DONE_NATION_CREATE,
} from '../actions/nations';

export const ALL_NATIONS = 0;
export const MY_NATIONS = 1;

const initialState = {
  nations: [
    {
      id: 'Andorra',
      name: 'Andorra',
      ethAddress: '0x0eb81892540747ec60f1389ec734a2c0e5f9f735',
    },
    {
      id: 'Australia',
      name: 'Australia',
      ethAddress: '0x0eb81892540747ec60f1389ec734a2c0e5f9f735',
    },
    {
      id: 'Argentina',
      name: 'Argentina',
      ethAddress: '0x0eb81892540747ec60f1389ec734a2c0e5f9f735',
    },
    {
      id: 'Freelancers',
      name: 'Freelancers',
      ethAddress: '0x0eb81892540747ec60f1389ec734a2c0e5f9f735',
    },
    {
      id: 'France',
      name: 'France',
      ethAddress: '0x0eb81892540747ec60f1389ec734a2c0e5f9f735',
    },
    {
      id: 'Germany',
      name: 'Germany',
      ethAddress: '0x0eb81892540747ec60f1389ec734a2c0e5f9f735',
    }
  ],
  myNations: ['Freelancers', 'Germany'],
  searchString: null,
  selectedTab: ALL_NATIONS,
  openedNationId: null,
  nation: null,
  creatingNation: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SWITCH_NATIONS_TAB:
      return Object.assign({}, state, { selectedTab: action.tab });
    case OPEN_NATION:
      return Object.assign({}, state, { openedNationId: action.nationId });
    case CANCEL_NATION_CREATE:
      return Object.assign({}, state, { creatingNation: null });
    case DONE_NATION_CREATE:
      return Object.assign({}, state, { nation: state.creatingNation, creatingNation: null });
  }
  return state;
}
