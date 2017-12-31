const initialState = {
  currentScreen: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        movies: action.payload.movies,
      };
    case 'FETCH_DATA_FAIL':
      return {
        ...state,
      };
    default:
      return state;
  }
}
  