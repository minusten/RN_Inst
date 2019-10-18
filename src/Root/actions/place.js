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

export const addTag = tags => {
  return {
    type: actionTypes.ADD_TAG,
    payload: tags
  };
};

export const deleteTag = id => {
  return {
    type: actionTypes.REMOVE_TAG,
    id: id
  };
};
