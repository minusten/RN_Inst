import * as actionTypes from '../actions/types';

const initialState = {
  coords: []
};

const positionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POSITION:
      return {
        ...state,
        coords: action.payload
      };
    default:
      return state;
  }
};

export default positionReducer;
