import * as actionTypes from './types';

export const addPlace = places => {
  return {
    type: actionTypes.ADD_PLACE,
    payload: places
  };
};

export const deleteImg = id => {
  return {
    type: actionTypes.REMOVE_IMG,
    id: id
  };
};
