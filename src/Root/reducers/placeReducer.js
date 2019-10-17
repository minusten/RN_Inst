import * as actionTypes from '../actions/types';

const initialState = {
  places: []
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLACE:
      return {
        ...state,
        places: action.payload
      };
    case actionTypes.REMOVE_IMG:
      return state.filter((data, i) => i !== action.id);
    default:
      return state;
  }
};

export default placeReducer;
