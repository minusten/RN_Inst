import { createStore, combineReducers } from 'redux';
import placeReducer from './reducers/placeReducer';
import tagsReducer from './reducers/tagsReducer';

const rootReducer = combineReducers({
  places: placeReducer,
  tags: tagsReducer
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
