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
      console.log('remove', state);
      return {
        places: state.places.filter((place, index) => {
          return action.id !== index;
        })
      };
    default:
      return state;
  }
};

export default placeReducer;
