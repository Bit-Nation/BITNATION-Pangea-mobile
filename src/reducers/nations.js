import { SWITCH_NATIONS_TAB } from '../actions/nations';

export const ALL_NATIONS = 0;
export const MY_NATIONS = 1;

const initialState = {
  nations: [
    {
      id: 'Andorra',
      name: 'Andorra',
    },
    {
      id: 'Buck',
      name: 'Buck',
    },
    {
      id: 'Bell',
      name: 'Bell',
    },
    {
      id: 'Test',
      name: 'Test',
    }
  ],
  myNations: ['Buck', 'Test'],
  searchString: null,
  selectedTab: ALL_NATIONS,
  openedNationId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SWITCH_NATIONS_TAB:
      return Object.assign({}, state, { selectedTab: action.tab });
  }
  return state;
}
