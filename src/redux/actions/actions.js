import * as actionTypes from './types';

export const addImages = images => {
  return {
    type: actionTypes.ADD_IMAGE,
    payload: images
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

export const addPosition = coord => {
  return {
    type: actionTypes.ADD_POSITION,
    payload: coord
  };
};
