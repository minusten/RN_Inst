import * as actionTypes from '../actions/types';

const initialState = {
  images: []
};

const imageReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case actionTypes.ADD_IMAGE:
      return {
        ...state,
        images: action.payload
      };
    case actionTypes.REMOVE_IMG:
      console.log('remove', state);
      return {
        images: state.images.filter((place, index) => {
          return action.id !== index;
        })
      };
    default:
      return state;
  }
};

export default imageReducer;
