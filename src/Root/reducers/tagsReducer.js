import * as actionTypes from '../actions/types';

const initialState = {
  tags: []
};
const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TAG:
      return {
        ...state,
        tags: action.payload
      };
    case actionTypes.REMOVE_TAG:
      console.log('remove', state);
      return {
        tags: state.tags.filter((tag, index) => {
          return action.id !== index;
        })
      };
    default:
      return state;
  }
};

export default tagsReducer;
