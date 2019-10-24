import * as actionTypes from '../actions/types';

const initialState = {
  tags: []
};
const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TAG:
      console.log('state tags', state);
      return {
        ...state,
        tags: action.payload
      };
    case actionTypes.REMOVE_TAG:
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
