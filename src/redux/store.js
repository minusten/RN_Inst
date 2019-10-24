import { createStore, combineReducers } from 'redux';
import imageReducer from './reducers/imageReducer';
import tagsReducer from './reducers/tagsReducer';
import positionReducer from './reducers/positionReducer';

const rootReducer = combineReducers({
  images: imageReducer,
  tags: tagsReducer,
  coords: positionReducer
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
